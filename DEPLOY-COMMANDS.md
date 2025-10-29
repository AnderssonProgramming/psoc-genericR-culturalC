# 🔧 Comandos Útiles para el Despliegue

## Verificar que el proyecto esté listo

### Backend
```bash
cd back
npm install
npm run build
npm run start:prod
```
Si funciona localmente, está listo para desplegar.

### Frontend
```bash
cd front
npm install --legacy-peer-deps
npm run build
npm start
```
Si funciona localmente, está listo para desplegar.

## Subir cambios a GitHub

```bash
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

## Variables de entorno para copiar/pegar

### En Railway (Backend):
```
NODE_ENV=production
PORT=3001
```
Luego agrega tus claves de Supabase, OpenAI, JWT, etc.

### En Vercel (Frontend):
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## URLs a guardar
- Railway Backend: _____________________________
- Vercel Frontend: _____________________________
