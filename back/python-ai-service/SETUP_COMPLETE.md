# 🎉 Migración Completada: Ollama → GPT-OSS

## ✅ Cambios Realizados

### 1. Nuevo Servicio Python AI (`back/python-ai-service/`)
- ✅ `app.py` - Servidor Flask con transformers y GPT-OSS
- ✅ `requirements.txt` - Dependencias Python
- ✅ `README.md` - Documentación del servicio
- ✅ `MIGRATION_GUIDE.md` - Guía detallada de migración
- ✅ `start.bat` - Script de inicio automático (Windows)
- ✅ `start.sh` - Script de inicio automático (Linux/Mac)
- ✅ `.gitignore` - Ignorar archivos temporales

### 2. Backend NestJS Actualizado
- ✅ `chat.service.ts` - Reemplazado `callOllama()` por `callPythonAiService()`
- ✅ `.env.example` - Actualizado con nuevas variables de entorno

## 🚀 Cómo Usar

### Paso 1: Configurar Variables de Entorno

Edita `back/.env` y agrega:

```env
USE_LOCAL_MODEL=true
PYTHON_AI_SERVICE_URL=http://localhost:5000
```

### Paso 2: Instalar y Ejecutar Python AI Service

**Opción A - Automático (Recomendado):**

Windows:
```bash
cd back/python-ai-service
start.bat
```

Linux/Mac:
```bash
cd back/python-ai-service
chmod +x start.sh
./start.sh
```

**Opción B - Manual:**

```bash
cd back/python-ai-service

# Crear entorno virtual
python -m venv venv

# Activar entorno
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servicio
python app.py
```

### Paso 3: Iniciar Backend NestJS

```bash
cd back
npm run start:dev
```

### Paso 4: Iniciar Frontend

```bash
cd front
npm run dev
```

## ⚠️ IMPORTANTE: Modelo GPT-OSS-120B

El modelo `openai/gpt-oss-safeguard-120b` es **MUY GRANDE** (~240GB):

- Requiere mínimo **256GB de RAM** o **80GB de VRAM** (GPU)
- Primera descarga puede tomar **horas**
- Tiempo de carga: **5-10 minutos**

### 🎯 RECOMENDACIÓN: Usar Phi-3-mini (Más Ligero)

Para desarrollo, es mejor usar un modelo más pequeño. Edita `back/python-ai-service/app.py`:

**Línea 65:**
```python
# Cambiar de:
tokenizer = AutoTokenizer.from_pretrained("openai/gpt-oss-safeguard-120b")

# A:
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")
```

**Línea 72:**
```python
# Cambiar de:
model = AutoModelForCausalLM.from_pretrained("openai/gpt-oss-safeguard-120b", ...)

# A:
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct", ...)
```

**Phi-3-mini ventajas:**
- ✅ Solo ~8GB
- ✅ Carga en 1-2 minutos
- ✅ Funciona en laptops normales
- ✅ Excelente calidad para este caso de uso

## 🧪 Verificar que Funciona

### 1. Verificar Python AI Service

```bash
curl http://localhost:5000/health
```

Debe responder:
```json
{
  "status": "ready",
  "model_loaded": true,
  "device": "cuda"  // o "cpu"
}
```

### 2. Probar Chat

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"¿Qué es Gender Quest?"}]}'
```

### 3. Probar desde Frontend

1. Abre http://localhost:3000
2. Haz clic en el chatbot flotante
3. Escribe: "¿Qué es Gender Quest?"
4. Deberías recibir una respuesta del modelo

## 🐛 Solución Rápida de Problemas

### Backend muestra "Python AI Service no disponible"

**Solución:** Asegúrate de que el servicio Python esté corriendo

```bash
cd back/python-ai-service
python app.py
```

### Error "CUDA out of memory"

**Solución 1:** Usa Phi-3-mini (ver arriba)

**Solución 2:** Activa cuantización 8-bit en `app.py` línea 73:

```python
model = AutoModelForCausalLM.from_pretrained(
    "microsoft/Phi-3-mini-4k-instruct",
    load_in_8bit=True,  # ← Agregar esto
    ...
)
```

### Modelo tarda mucho en descargar

**Normal:** Primera vez descarga el modelo completo
- Phi-3-mini: ~4GB (10-30 min)
- GPT-OSS-120B: ~240GB (horas)

Los modelos se cachean en `~/.cache/huggingface/`

## 📚 Documentación Adicional

- **Guía Completa:** `back/python-ai-service/MIGRATION_GUIDE.md`
- **README Python:** `back/python-ai-service/README.md`
- **Transformers Docs:** https://huggingface.co/docs/transformers/

## 🎯 Próximos Pasos

1. ✅ Cambiar a Phi-3-mini (recomendado)
2. ✅ Probar el chatbot
3. ✅ Hacer commit de cambios
4. 🚀 ¡Disfrutar del nuevo sistema!

## 📦 Commit Sugerido

```bash
git add .
git commit -m "feat: migrate chatbot from Ollama to GPT-OSS with Python transformers

- Add Python AI Service with Flask + transformers
- Replace Ollama integration with GPT-OSS
- Add automatic setup scripts (start.bat/start.sh)
- Update .env configuration
- Add comprehensive migration guide
- Recommend Phi-3-mini for development"

git push origin main
```

---

**¿Necesitas ayuda?** Revisa `MIGRATION_GUIDE.md` para solución de problemas detallada.
