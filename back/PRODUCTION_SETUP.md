# 🚀 Configuración del Chatbot - Producción vs Desarrollo

## 🌐 Para PRODUCCIÓN (Railway + Vercel)

### Opción Recomendada: HuggingFace Inference API

**Ventajas:**
- ✅ Gratis (con límites razonables)
- ✅ No requiere infraestructura adicional
- ✅ Modelo Phi-3-mini es rápido y eficiente
- ✅ Ya está integrado en el código

### Configuración en Railway

1. Ve a tu proyecto en Railway
2. Settings → Variables
3. Configura:

```env
USE_LOCAL_MODEL=false
HUGGINGFACE_API_KEY=tu_token_de_huggingface
```

### Obtener HuggingFace API Key

1. Crea cuenta en https://huggingface.co/
2. Ve a https://huggingface.co/settings/tokens
3. Click "New token"
4. Nombre: "Gender Quest Chatbot"
5. Type: "Read"
6. Copia el token y agrégalo a Railway

### Modelo Usado en Producción

`microsoft/Phi-3-mini-4k-instruct`
- 🚀 Rápido (respuesta en 2-5 segundos)
- 💡 Buena calidad para casos educativos
- 🆓 Gratis en HuggingFace Inference API

---

## 💻 Para DESARROLLO LOCAL (Opcional)

Si quieres probar modelos más avanzados localmente, puedes usar el Python AI Service.

### Configuración Local

**Archivo `back/.env`:**
```env
USE_LOCAL_MODEL=true
PYTHON_AI_SERVICE_URL=http://localhost:5000
```

### Iniciar Servicios

```bash
# Terminal 1: Python AI Service
cd back/python-ai-service
start.bat  # Windows
# o
./start.sh  # Linux/Mac

# Terminal 2: Backend
cd back
npm run start:dev

# Terminal 3: Frontend
cd front
npm run dev
```

**Nota:** El Python AI Service solo funciona en desarrollo local, NO en Railway.

---

## 🔄 Resumen de Configuración

### Producción (Railway)
```env
USE_LOCAL_MODEL=false
HUGGINGFACE_API_KEY=hf_xxxxx
```
→ Usa HuggingFace Inference API (cloud)

### Desarrollo (Local)
```env
USE_LOCAL_MODEL=true
PYTHON_AI_SERVICE_URL=http://localhost:5000
```
→ Usa Python AI Service local (opcional)

---

## ✅ Siguiente Paso

Para desplegar en producción:

1. **Configura HuggingFace API Key en Railway**
2. **Haz commit:**
   ```bash
   git add .
   git commit -m "feat: add Python AI service for local dev, keep HuggingFace for production"
   git push origin main
   ```
3. **Railway se redesplegará automáticamente**
4. **Prueba el chatbot en tu app desplegada**

El Python AI Service es solo para desarrollo local avanzado. Tu app en producción usará HuggingFace API que ya está configurado en el código.
