# 🚀 Guía de Migración: De Ollama a GPT-OSS

Esta guía te ayudará a migrar el chatbot de Ollama (local) a GPT-OSS de OpenAI usando transformers.

## 📋 Resumen de Cambios

### Antes (Ollama - Local)
- ✅ Modelo corriendo en tu máquina
- ✅ Ollama servía el modelo vía API REST
- ❌ Limitado a modelos soportados por Ollama
- ❌ Configuración específica de Ollama

### Ahora (GPT-OSS - Python Service)
- ✅ Modelo GPT-OSS-120B de OpenAI
- ✅ Servicio Python con Flask + transformers
- ✅ Compatible con cualquier modelo de HuggingFace
- ✅ Mayor flexibilidad y control

## 🛠️ Instalación Paso a Paso

### 1. Instalar Python AI Service

```bash
# Navegar a la carpeta del servicio
cd back/python-ai-service

# Opción A: Usar script automático (Windows)
start.bat

# Opción B: Usar script automático (Linux/Mac)
chmod +x start.sh
./start.sh

# Opción C: Manual
python -m venv venv
venv\Scripts\activate  # Windows
# o
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python app.py
```

### 2. Configurar Backend NestJS

Edita tu archivo `.env` en la carpeta `back/`:

```env
# Activar uso del servicio Python
USE_LOCAL_MODEL=true
PYTHON_AI_SERVICE_URL=http://localhost:5000

# Opcional: HuggingFace API como respaldo
HUGGINGFACE_API_KEY=tu_token_aqui
```

### 3. Iniciar Servicios

**Terminal 1 - Python AI Service:**
```bash
cd back/python-ai-service
python app.py
```

**Terminal 2 - Backend NestJS:**
```bash
cd back
npm run start:dev
```

**Terminal 3 - Frontend:**
```bash
cd front
npm run dev
```

## ⚙️ Configuración Avanzada

### Usar un Modelo Más Ligero

Si GPT-OSS-120B es muy pesado para tu máquina, edita `app.py` líneas 65 y 72:

```python
# Cambiar de:
tokenizer = AutoTokenizer.from_pretrained("openai/gpt-oss-safeguard-120b")
model = AutoModelForCausalLM.from_pretrained("openai/gpt-oss-safeguard-120b", ...)

# A uno de estos modelos más ligeros:

# Opción 1: GPT-OSS 7B (~14GB)
tokenizer = AutoTokenizer.from_pretrained("openai/gpt-oss-safeguard-7b")
model = AutoModelForCausalLM.from_pretrained("openai/gpt-oss-safeguard-7b", ...)

# Opción 2: Microsoft Phi-3 Mini (~8GB) - MUY RECOMENDADO
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct", ...)

# Opción 3: Mistral 7B (~14GB)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2", ...)
```

### Optimización de Memoria

Para reducir el uso de memoria, agrega cuantización 8-bit:

```python
model = AutoModelForCausalLM.from_pretrained(
    "openai/gpt-oss-safeguard-120b",
    torch_dtype=torch.float16,
    device_map="auto",
    load_in_8bit=True,  # ← Agregar esta línea
    low_cpu_mem_usage=True,
)
```

### Usar GPU (NVIDIA CUDA)

Si tienes una GPU NVIDIA, instala PyTorch con soporte CUDA:

```bash
pip uninstall torch
pip install torch --index-url https://download.pytorch.org/whl/cu118
```

Verifica que funcione:
```python
import torch
print(torch.cuda.is_available())  # Debe ser True
```

## 🧪 Pruebas

### 1. Verificar Python AI Service

```bash
# Health check
curl http://localhost:5000/health

# Respuesta esperada:
# {"status": "ready", "model_loaded": true, "device": "cuda"}
```

### 2. Probar Chat

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"¿Qué es Gender Quest?"}]}'
```

### 3. Probar desde Frontend

1. Abre http://localhost:3000
2. Navega al chat (icono flotante)
3. Escribe una pregunta
4. Verifica que la respuesta viene del modelo GPT-OSS

## 🐛 Solución de Problemas

### Error: "CUDA out of memory"

**Solución 1:** Usa un modelo más pequeño (ver "Usar un Modelo Más Ligero")

**Solución 2:** Activa cuantización 8-bit (ver "Optimización de Memoria")

**Solución 3:** Reduce `max_new_tokens` en `app.py` línea 97:
```python
outputs = model.generate(
    **inputs,
    max_new_tokens=200,  # Reducir de 400 a 200
    ...
)
```

### Error: "Connection refused" en backend

Verifica que Python AI Service esté corriendo:
```bash
curl http://localhost:5000/health
```

Si no responde, inicia el servicio:
```bash
cd back/python-ai-service
python app.py
```

### Modelo tarda mucho en cargar

Es normal para modelos grandes:
- GPT-OSS-120B: 5-10 minutos
- Phi-3-mini: 1-2 minutos

La primera vez también descargará el modelo (~240GB para 120B, ~8GB para Phi-3).

### Backend usa respuestas demo

Verifica tu `.env`:
```env
USE_LOCAL_MODEL=true  # Debe ser true
PYTHON_AI_SERVICE_URL=http://localhost:5000  # URL correcta
```

Reinicia el backend:
```bash
cd back
npm run start:dev
```

## 📊 Comparación de Modelos

| Modelo | Tamaño | Tiempo Carga | RAM/VRAM | Calidad |
|--------|--------|--------------|----------|---------|
| GPT-OSS-120B | ~240GB | 5-10 min | 256GB+ | ⭐⭐⭐⭐⭐ |
| GPT-OSS-7B | ~14GB | 2-3 min | 32GB+ | ⭐⭐⭐⭐ |
| Phi-3-mini | ~8GB | 1-2 min | 16GB+ | ⭐⭐⭐⭐ |
| Mistral-7B | ~14GB | 2-3 min | 32GB+ | ⭐⭐⭐⭐ |

**Recomendación:** Usa **Phi-3-mini** para desarrollo (rápido, ligero, buena calidad)

## 📚 Recursos Adicionales

- [Documentación transformers](https://huggingface.co/docs/transformers/)
- [GPT-OSS en HuggingFace](https://huggingface.co/openai/gpt-oss-safeguard-120b)
- [Phi-3 en HuggingFace](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct)
- [PyTorch CUDA Setup](https://pytorch.org/get-started/locally/)

## 🎯 Próximos Pasos

1. ✅ Instalar Python AI Service
2. ✅ Configurar `.env`
3. ✅ Probar endpoints
4. ✅ Verificar frontend
5. 🚀 ¡Listo para usar!

¿Problemas? Revisa la sección "Solución de Problemas" o abre un issue.
