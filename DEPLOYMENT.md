# 🚀 Guía de Despliegue - Gender Quest

Esta guía te ayudará a desplegar el backend y frontend de Gender Quest en la nube de forma gratuita.

## 📋 Requisitos Previos

- Cuenta de GitHub
- Cuenta de Railway (https://railway.app) - Para el backend
- Cuenta de Vercel (https://vercel.com) - Para el frontend
- Tus credenciales de Supabase y OpenAI

---

## 🔧 PASO 1: Preparar el Repositorio

### 1.1 Subir el código a GitHub (si no lo has hecho)

```bash
git add .
git commit -m "Preparar proyecto para despliegue"
git push origin main
```

---

## 🚂 PASO 2: Desplegar el Backend en Railway

### 2.1 Crear cuenta y proyecto

1. Ve a https://railway.app
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Selecciona tu repositorio `psoc-genericR-culturalC`

### 2.2 Configurar el servicio

1. Railway detectará automáticamente el monorepo
2. Click en "Add variables" para agregar las variables de entorno:

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=tu_supabase_url
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_key
SECRET_HMAC_KEY=tu_secret_hmac
OPENAI_API_KEY=tu_openai_key
JWT_SECRET=tu_jwt_secret
FRONTEND_URL=https://tu-app.vercel.app
```

### 2.3 Configurar Root Directory

1. En Railway, ve a Settings
2. En "Root Directory" pon: `back`
3. En "Build Command" pon: `npm install && npm run build`
4. En "Start Command" pon: `npm run start:prod`

### 2.4 Obtener la URL del backend

1. Ve a la pestaña "Settings"
2. Click en "Generate Domain"
3. Copia la URL generada (ejemplo: `gender-quest-back.up.railway.app`)
4. **Guarda esta URL, la necesitarás para el frontend**

---

## ▲ PASO 3: Desplegar el Frontend en Vercel

### 3.1 Crear proyecto en Vercel

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en "Add New..." → "Project"
4. Selecciona tu repositorio `psoc-genericR-culturalC`

### 3.2 Configurar el proyecto

1. En "Root Directory" selecciona: `front`
2. Framework Preset: Next.js (debe detectarse automáticamente)
3. Build Command: `npm run build`
4. Install Command: `npm install --legacy-peer-deps`

### 3.3 Configurar Variables de Entorno

Click en "Environment Variables" y agrega:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_API_URL=https://tu-backend.up.railway.app/api
OPENAI_API_KEY=tu_openai_key
```

⚠️ **IMPORTANTE**: En `NEXT_PUBLIC_API_URL` usa la URL de Railway que obtuviste en el paso 2.4

### 3.4 Desplegar

1. Click en "Deploy"
2. Espera a que termine el despliegue (2-5 minutos)
3. Copia la URL de tu aplicación (ejemplo: `gender-quest.vercel.app`)

---

## 🔄 PASO 4: Actualizar Backend con URL del Frontend

1. Vuelve a Railway
2. Ve a Variables
3. Actualiza `FRONTEND_URL` con tu URL de Vercel: `https://tu-app.vercel.app`
4. El servicio se reiniciará automáticamente

---

## ✅ PASO 5: Verificar el Despliegue

### 5.1 Probar el Backend

Abre en tu navegador: `https://tu-backend.up.railway.app/api`

Deberías ver algo como: `{"message": "Gender Quest API"}`

### 5.2 Probar el Frontend

1. Abre tu URL de Vercel: `https://tu-app.vercel.app`
2. Navega por la aplicación
3. Intenta jugar el quiz
4. Verifica el chatbot

---

## 🐛 Solución de Problemas

### Error de CORS

Si ves errores de CORS en la consola del navegador:
- Verifica que `FRONTEND_URL` en Railway incluya `https://` y no tenga `/` al final
- Asegúrate de que la URL sea exactamente la de Vercel

### Error 500 en el Backend

- Verifica que todas las variables de entorno estén correctamente configuradas
- Revisa los logs en Railway: Click en tu servicio → "Deployments" → Click en el deployment → "View Logs"

### Frontend no se conecta al Backend

- Verifica que `NEXT_PUBLIC_API_URL` termine en `/api`
- Asegúrate de que la URL del backend en Railway esté activa

### Variables de entorno no se actualizan

- Después de cambiar variables en Vercel, haz un "Redeploy" del proyecto
- En Railway, los cambios de variables reinician automáticamente el servicio

---

## 🔄 Despliegues Futuros

### Backend (Railway)
Cada vez que hagas `git push`, Railway detectará los cambios y desplegará automáticamente.

### Frontend (Vercel)
Cada vez que hagas `git push`, Vercel detectará los cambios y desplegará automáticamente.

---

## 💰 Costos

- **Railway**: Gratis hasta $5 USD de uso mensual
- **Vercel**: Gratis ilimitado para proyectos personales
- **Supabase**: Gratis con límites generosos
- **OpenAI**: Pago por uso (muy económico para este proyecto)

---

## 📊 Monitoreo

### Railway
- Dashboard: https://railway.app/dashboard
- Ver logs en tiempo real
- Ver métricas de uso

### Vercel
- Dashboard: https://vercel.com/dashboard
- Ver analytics
- Ver logs de deployment

---

## 🎯 URLs Finales para Entregar

Una vez desplegado, tendrás:

- **Frontend (URL pública)**: `https://tu-proyecto.vercel.app`
- **Backend (API)**: `https://tu-backend.up.railway.app/api`

**Entrega el link del frontend** - los usuarios accederán desde ahí y el frontend se comunicará automáticamente con el backend.

---

## 🆘 Ayuda Adicional

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- NestJS Deployment: https://docs.nestjs.com/deployment
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## ✨ Alternativas

Si Railway o Vercel no funcionan, puedes usar:

### Para Backend:
- **Render**: https://render.com (Similar a Railway)
- **Fly.io**: https://fly.io
- **Cyclic**: https://cyclic.sh

### Para Frontend:
- **Netlify**: https://netlify.com
- **Cloudflare Pages**: https://pages.cloudflare.com

---

¡Buena suerte con el despliegue! 🚀
