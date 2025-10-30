# Python AI Service - GPT-OSS

Servicio Python que expone el modelo GPT-OSS-120B de OpenAI mediante una API REST para ser consumido por el backend de NestJS.

## 🚀 Instalación

### 1. Crear entorno virtual

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

**⚠️ IMPORTANTE:** El modelo GPT-OSS-120B es muy grande (~240GB). Si no tienes suficiente RAM/VRAM, considera usar un modelo más pequeño:

#### Alternativas más ligeras:
- `openai/gpt-oss-safeguard-7b` (~14GB)
- `microsoft/phi-3-mini-4k-instruct` (~8GB)
- `mistralai/Mistral-7B-Instruct-v0.2` (~14GB)

Para cambiar el modelo, edita `app.py` línea 65 y 72.

## 🎯 Uso

### Iniciar el servicio

```bash
python app.py
```

El servicio estará disponible en `http://localhost:5000`

### Endpoints

#### 1. Health Check
```bash
GET /health
```

Respuesta:
```json
{
  "status": "ready",
  "model_loaded": true,
  "device": "cuda"
}
```

#### 2. Chat
```bash
POST /chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "¿Qué es Gender Quest?"}
  ]
}
```

Respuesta:
```json
{
  "message": "Gender Quest es un juego educativo...",
  "timestamp": null
}
```

#### 3. Info
```bash
GET /info
```

## 🔧 Configuración

### Usar GPU (NVIDIA CUDA)

Si tienes una GPU NVIDIA, el modelo la usará automáticamente. Asegúrate de tener instalado:
- CUDA Toolkit
- PyTorch con soporte CUDA: `pip install torch --index-url https://download.pytorch.org/whl/cu118`

### Ajustar memoria

Si encuentras problemas de memoria, edita `app.py` línea 67-71:

```python
model = AutoModelForCausalLM.from_pretrained(
    "openai/gpt-oss-safeguard-120b",
    torch_dtype=torch.float16,  # Cambiar a float8 o int8 para menor memoria
    device_map="auto",
    load_in_8bit=True,  # Agregar esta línea para quantización 8-bit
)
```

## 🐛 Troubleshooting

### Error: "Out of memory"
- Usa un modelo más pequeño
- Activa quantización 8-bit agregando `load_in_8bit=True`
- Reduce `max_new_tokens` en línea 97

### Error: "CUDA not available"
- Instala PyTorch con soporte CUDA
- O usa CPU (será más lento)

### Modelo tarda mucho en cargar
- Es normal para modelos grandes (puede tomar 5-10 minutos)
- Considera usar un modelo más pequeño

## 📝 Notas

- Primera carga descargará el modelo (puede tomar horas dependiendo de tu conexión)
- Los modelos se cachean en `~/.cache/huggingface/`
- Para producción, considera usar servicios administrados como HuggingFace Inference API
