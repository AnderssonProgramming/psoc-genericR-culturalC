# 🚀 INICIO RÁPIDO - Despliegue en 10 minutos

## Opción Recomendada: Vercel (Frontend) + Railway (Backend)

### ⚡ Pasos Rápidos

#### 1. Backend en Railway (5 minutos)
```
1. Ir a railway.app
2. Login con GitHub
3. New Project → Deploy from GitHub → Seleccionar repo
4. Settings → Root Directory: "back"
5. Variables → Agregar las del archivo .env
6. Generate Domain → Copiar URL
```

#### 2. Frontend en Vercel (5 minutos)
```
1. Ir a vercel.com
2. Login con GitHub
3. New Project → Seleccionar repo
4. Root Directory: "front"
5. Environment Variables → Agregar:
   - NEXT_PUBLIC_API_URL=https://[tu-railway-url]/api
   - Las demás de .env.local
6. Deploy → Copiar URL final
```

#### 3. Actualizar Backend
```
1. Volver a Railway
2. Variables → FRONTEND_URL=https://[tu-vercel-url]
3. ✅ Listo!
```

---

## 📝 Variables de Entorno Necesarias

### Backend (Railway)
```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SECRET_HMAC_KEY=
OPENAI_API_KEY=
JWT_SECRET=
FRONTEND_URL=https://tu-app.vercel.app
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=https://tu-backend.up.railway.app/api
OPENAI_API_KEY=
```

---

## ✅ Verificación

- Backend: https://tu-backend.railway.app/api
- Frontend: https://tu-app.vercel.app

---

Ver guía completa en: [DEPLOYMENT.md](./DEPLOYMENT.md)
