from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Variables globales para el modelo
tokenizer = None
model = None
device = None

SYSTEM_CONTEXT = """Eres un asistente educativo del juego "Gender Quest" sobre roles de género y equidad.

CONTEXTO DE LA APLICACIÓN:
- Gender Quest es un quiz interactivo de 10 preguntas sobre roles de género
- Categorías: Hogar, Sociedad, y Profesional
- Objetivo: Cuestionar estereotipos y promover reflexión sobre equidad de género
- Los usuarios responden preguntas y reciben feedback educativo
- Al finalizar obtienen un puntaje y aparecen en un ranking global

TEMAS PRINCIPALES:
1. Roles de género en el hogar (tareas domésticas, crianza, decisiones)
2. Estereotipos sociales (emociones, apariencia, maternidad/paternidad)
3. Desigualdad en el ámbito profesional (liderazgo, brecha salarial, oportunidades)

Tu rol es:
✅ Responder preguntas sobre roles de género, estereotipos y equidad
✅ Explicar conceptos del juego y sus categorías
✅ Proporcionar información educativa y basada en evidencia
✅ Mantener un tono respetuoso, inclusivo y educativo
✅ Responder en español de forma concisa (máximo 3-4 párrafos)

❌ NO debes:
- Juzgar o criticar las respuestas del usuario
- Dar opiniones políticas extremas
- Usar lenguaje ofensivo o discriminatorio"""


def load_model():
    """Carga el modelo GPT-OSS de OpenAI"""
    global tokenizer, model, device
    
    try:
        logger.info("🤖 Cargando modelo GPT-OSS-120B de OpenAI...")
        logger.info("⚠️ NOTA: Este modelo es grande (~240GB). Asegúrate de tener suficiente RAM/VRAM.")
        
        # Detectar dispositivo (GPU si está disponible)
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"📱 Usando dispositivo: {device}")
        
        # Cargar tokenizer
        logger.info("📚 Cargando tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained("openai/gpt-oss-safeguard-120b")
        
        # Cargar modelo con configuración de memoria optimizada
        logger.info("🧠 Cargando modelo (esto puede tomar varios minutos)...")
        model = AutoModelForCausalLM.from_pretrained(
            "openai/gpt-oss-safeguard-120b",
            torch_dtype=torch.float16 if device == "cuda" else torch.float32,
            device_map="auto",  # Distribución automática en GPU/CPU
            low_cpu_mem_usage=True,
        )
        
        logger.info("✅ Modelo cargado exitosamente")
        return True
        
    except Exception as e:
        logger.error(f"❌ Error cargando modelo: {e}")
        logger.error("💡 Considera usar un modelo más pequeño como 'openai/gpt-oss-safeguard-7b' o 'microsoft/phi-3-mini-4k-instruct'")
        return False


def generate_response(messages):
    """Genera una respuesta usando el modelo"""
    global tokenizer, model, device
    
    try:
        # Agregar contexto del sistema
        full_messages = [
            {"role": "system", "content": SYSTEM_CONTEXT}
        ] + messages
        
        # Preparar inputs
        inputs = tokenizer.apply_chat_template(
            full_messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
        ).to(device)
        
        # Generar respuesta
        logger.info("💭 Generando respuesta...")
        outputs = model.generate(
            **inputs,
            max_new_tokens=400,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id,
        )
        
        # Decodificar solo la nueva respuesta
        response = tokenizer.decode(
            outputs[0][inputs["input_ids"].shape[-1]:],
            skip_special_tokens=True
        ).strip()
        
        logger.info("✅ Respuesta generada")
        return response
        
    except Exception as e:
        logger.error(f"❌ Error generando respuesta: {e}")
        return get_fallback_response(messages[-1]["content"])


def get_fallback_response(user_message):
    """Respuesta de respaldo si el modelo falla"""
    return """Lo siento, estoy experimentando dificultades técnicas en este momento. 

Gender Quest es un juego educativo sobre roles de género con 10 preguntas en 3 categorías: Hogar, Sociedad y Profesional. 

¿Puedes intentar tu pregunta nuevamente o reformularla de otra manera?"""


@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificar el estado del servicio"""
    is_ready = model is not None and tokenizer is not None
    return jsonify({
        "status": "ready" if is_ready else "loading",
        "model_loaded": is_ready,
        "device": str(device) if device else "unknown"
    }), 200 if is_ready else 503


@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint principal para el chat"""
    try:
        data = request.json
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({"error": "No messages provided"}), 400
        
        # Verificar que el modelo esté cargado
        if model is None or tokenizer is None:
            return jsonify({
                "error": "Model not loaded yet",
                "message": get_fallback_response(messages[-1].get("content", ""))
            }), 503
        
        # Generar respuesta
        response = generate_response(messages)
        
        return jsonify({
            "message": response,
            "timestamp": None
        }), 200
        
    except Exception as e:
        logger.error(f"❌ Error en /chat: {e}")
        return jsonify({
            "error": str(e),
            "message": get_fallback_response("")
        }), 500


@app.route('/info', methods=['GET'])
def info():
    """Información sobre el modelo"""
    return jsonify({
        "model": "openai/gpt-oss-safeguard-120b",
        "status": "ready" if model is not None else "not_loaded",
        "device": str(device) if device else "unknown",
        "framework": "transformers + pytorch"
    })


if __name__ == '__main__':
    # Cargar modelo al iniciar
    logger.info("🚀 Iniciando servicio de IA...")
    success = load_model()
    
    if not success:
        logger.warning("⚠️ El modelo no se cargó correctamente. El servicio funcionará con respuestas de respaldo.")
    
    # Iniciar servidor Flask
    port = 5000
    logger.info(f"🌐 Servidor escuchando en http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
