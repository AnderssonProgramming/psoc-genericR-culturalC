# 🎮 Gender Quest - Plataforma Educativa sobre Roles de Género

**Gender Quest** es una plataforma educativa completa que combina un videojuego de tres mundos con una aplicación web para promover la reflexión sobre roles de género, estereotipos y la importancia de la igualdad.

## 📋 Características Principales

### 🎯 Juego (Unity)
- **3 Mundos Temáticos**: Morado (Ciencia/Medicina), Rosa (Arte/Literatura), Celeste (Política/Activismo)
- **30 Preguntas Interactivas** sobre mujeres destacadas en diferentes campos
- **Sistema de Puntaje**: Genera código HMAC verificable al completar el juego
- **Educación**: Contenido basado en el documental de 8 secciones temáticas

### 🌐 Plataforma Web
- **Autenticación de usuarios** con JWT
- **Sistema de envío de puntajes** con verificación criptográfica HMAC-SHA256
- **Ranking global en tiempo real** con Supabase
- **Chatbot educativo AI** con GPT-4 sobre roles de género
- **8 Secciones educativas** con contenido del documental
- **Diseño responsive** con Tailwind CSS y animaciones con Framer Motion

## 🏗️ Arquitectura del Proyecto

```
psoc-genericR-culturalC/
├── front/                    # Frontend Next.js 14
│   ├── app/                  # App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── login/           # Autenticación
│   │   ├── register/        # Registro de usuarios
│   │   ├── submit-score/    # Envío de códigos
│   │   ├── leaderboard/     # Ranking global
│   │   ├── chat/            # Chatbot AI
│   │   └── sections/        # Contenido educativo
│   ├── lib/                 # Utilidades
│   │   ├── api.ts           # Cliente API
│   │   ├── supabase.ts      # Cliente Supabase
│   │   └── utils.ts         # Helpers
│   └── package.json
│
├── back/                     # Backend NestJS
│   ├── src/
│   │   ├── auth/            # Módulo autenticación JWT
│   │   ├── scores/          # Módulo envío puntajes
│   │   ├── leaderboard/     # Módulo ranking
│   │   ├── chat/            # Módulo chatbot OpenAI
│   │   ├── common/          # HMAC service
│   │   └── supabase/        # Integración Supabase
│   ├── supabase/migrations/ # Schemas DB
│   └── package.json
│
└── README.md
```

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS 10**: Framework Node.js con TypeScript
- **Supabase**: Base de datos PostgreSQL con RLS
- **JWT**: Autenticación con Passport
- **bcrypt**: Hashing de contraseñas
- **OpenAI API**: Integración GPT-4 para chatbot educativo
- **HMAC-SHA256**: Verificación de códigos Unity

### Frontend
- **Next.js 14**: React framework con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **Framer Motion**: Animaciones fluidas
- **Zustand**: State management (opcional para expansión)
- **React Hook Form + Zod**: Validación de formularios

### Base de Datos (Supabase/PostgreSQL)
- **Tablas**: users, scores, chat_sessions, analytics_events
- **RLS Policies**: Seguridad a nivel de fila
- **Indexes**: Optimización de queries
- **Functions**: get_average_score()

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ y npm/pnpm
- Cuenta en Supabase (https://supabase.com)
- API Key de OpenAI (https://platform.openai.com)

### 1. Backend Setup

```bash
cd back

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales:
# - SUPABASE_URL (desde tu proyecto Supabase)
# - SUPABASE_ANON_KEY (desde Settings > API)
# - JWT_SECRET (genera uno: openssl rand -base64 32)
# - HMAC_SECRET (genera uno: openssl rand -base64 32)
# - OPENAI_API_KEY (desde OpenAI Dashboard)

# Aplicar migraciones a Supabase
# Ejecuta el contenido de supabase/migrations/001_initial_schema.sql
# en el SQL Editor de tu proyecto Supabase

# Iniciar servidor de desarrollo
npm run start:dev
# Backend corre en http://localhost:3000
```

### 2. Frontend Setup

```bash
cd front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local

# Editar .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
# NEXT_PUBLIC_SUPABASE_URL=<tu-url-supabase>
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>

# Iniciar servidor de desarrollo
npm run dev
# Frontend corre en http://localhost:3001
```

### 3. Verificar Instalación

1. Abre http://localhost:3001 (Frontend)
2. Regístrate como nuevo usuario
3. Verifica que puedas:
   - Iniciar sesión
   - Acceder al chat AI (requiere OPENAI_API_KEY)
   - Ver secciones educativas
   - Ver leaderboard (vacío inicialmente)

## 🎮 Flujo de Uso

### Para Jugadores

1. **Descargar el juego** (Unity) desde la landing page
2. **Jugar los 3 mundos**: Morado → Rosa → Celeste
3. **Responder las 30 preguntas** sobre mujeres destacadas
4. **Copiar el código** generado al finalizar
   - Formato: `username|850|28|30|1698765432|a3d8f9e2...`
5. **Crear cuenta** en la plataforma web
6. **Enviar código** en `/submit-score`
7. **Ver tu posición** en el ranking global

### Para Educadores

1. **Explorar las 8 secciones** educativas con contenido del documental
2. **Usar el chatbot AI** para responder preguntas de estudiantes
3. **Revisar el leaderboard** para gamificar el aprendizaje
4. **Compartir códigos** con estudiantes para verificar finalización

## 🔐 Seguridad

- **HMAC-SHA256**: Códigos Unity firmados criptográficamente, imposibles de falsificar
- **Validación de expiración**: Códigos válidos por 7 días desde generación
- **JWT**: Tokens de sesión seguros con expiración
- **bcrypt**: Contraseñas hasheadas con salt (rounds: 10)
- **RLS Policies**: Usuarios solo acceden a sus propios datos
- **Validación de entrada**: DTOs con class-validator en backend

## 🧪 Testing

```bash
# Backend
cd back
npm run test              # Unit tests
npm run test:e2e          # E2E tests
npm run test:cov          # Coverage report

# Frontend (agregar en futuro)
cd front
npm run test              # Jest tests
```

## 📊 Base de Datos Schema

### Tabla: users
- `id`: UUID primary key
- `username`: unique, not null
- `email`: unique, not null
- `password_hash`: not null
- `created_at`: timestamp

### Tabla: scores
- `id`: UUID primary key
- `user_id`: FK a users (CASCADE)
- `score`: integer not null
- `correct_answers`: integer
- `total_questions`: integer
- `submitted_code`: text unique (código HMAC completo)
- `submitted_at`: timestamp

### Tabla: chat_sessions
- `id`: UUID primary key
- `user_id`: FK a users (CASCADE)
- `messages`: JSONB (array de {role, content, timestamp})
- `created_at`: timestamp
- `updated_at`: timestamp

## 🤝 Contribuir

Este es un proyecto educativo. Para contribuir:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto bajo licencia MIT para fines educativos.

## 👥 Autores

Proyecto desarrollado como parte de una iniciativa educativa sobre igualdad de género.

## 🆘 Soporte

Para preguntas o problemas:
- Revisa la documentación en `/front/README.md` y `/back/README.md`
- Abre un issue en GitHub
- Verifica que todas las variables de entorno estén configuradas

## 🎯 Roadmap Futuro

- [ ] Integración con Unity WebGL para jugar en navegador
- [ ] Sistema de logros y badges
- [ ] Dashboard de analíticas para educadores
- [ ] Multi-idioma (i18n)
- [ ] Modo oscuro
- [ ] PWA para uso offline
- [ ] Tests E2E completos
- [ ] Exportación de datos de estudiantes (CSV/PDF)

---

**Gender Quest** - Jugando aprendemos igualdad 🎮✨

