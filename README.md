<div align="center">

# 🎮 Gender Quest

### Plataforma Educativa Interactiva sobre Roles de Género

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-black?logo=three.js)](https://threejs.org/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-purple?logo=ai)](https://groq.com/)

*Jugando aprendemos igualdad* 🌟

[🚀 Demo en Vivo](https://psoc-generic-r-cultural-c.vercel.app/) | [📖 Documentación](#-tabla-de-contenidos) | [🤝 Contribuir](#-contribuir) | [📝 Licencia](#-licencia)

</div>

---

## 🌐 Despliegue

- **Frontend**: [https://psoc-generic-r-cultural-c.vercel.app/](https://psoc-generic-r-cultural-c.vercel.app/) (Vercel)
- **Backend API**: [https://psoc-genericr-culturalc-production.up.railway.app/api](https://psoc-genericr-culturalc-production.up.railway.app/api) (Railway)
- **Base de Datos**: Supabase PostgreSQL (Cloud)

---

## 📖 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura](#️-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Base de Datos](#-base-de-datos)
- [Seguridad](#-seguridad)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autores](#-autores)

---

## 🌟 Sobre el Proyecto

**Gender Quest** es una plataforma educativa interactiva que combina gamificación, inteligencia artificial y contenido multimedia para promover la reflexión crítica sobre roles de género, estereotipos y la importancia de la equidad. 

El proyecto integra:
- 🎯 **Juego web 3D** con Three.js y preguntas interactivas
- 🤖 **Chatbot educativo AI** con Groq (Llama 3.3 70B) sobre roles de género
- 📊 **Sistema de ranking** en tiempo real
- 📚 **8 secciones educativas** con contenido multimedia
- 🎵 **Música ambiente** con controles personalizados
- 💬 **Chat flotante** minimizable en todas las páginas
- 🔐 **Autenticación segura** con JWT y verificación HMAC

### 🎯 Objetivos del Proyecto

- ✨ Educar sobre roles de género a través de la gamificación
- 🌍 Promover la igualdad y equidad de género
- 📖 Proporcionar contenido educativo accesible y atractivo
- 🎮 Crear experiencias de aprendizaje interactivas e inmersivas

---

## ✨ Características Principales

### 🎮 Juego Interactivo 3D

- **30 Preguntas Educativas**: Sobre mujeres destacadas en ciencia, arte y política
- **Experiencia 3D Inmersiva**: Visualización con Three.js y React Three Fiber
- **Sistema de Puntaje**: Puntuación en tiempo real y feedback inmediato
- **Códigos HMAC**: Verificación criptográfica de resultados
- **Pantallas Dinámicas**: Bienvenida, juego, y resultados animados

### 🤖 Chatbot AI Educativo

- **Groq API (Llama 3.3 70B)**: Modelo de lenguaje de última generación
- **Interfaz Flotante Minimizable**: Disponible en todas las páginas con botón para minimizar
- **Chat de Página Completa**: Interfaz dedicada con tema oscuro y diseño moderno
- **Historial de Conversación**: Guarda el contexto de la sesión
- **Respuestas Educativas**: Enfocadas en equidad e igualdad de género
- **Desarrollo Local Opcional**: Python AI Service con transformers para desarrollo sin API

### 📊 Ranking Global

- **Leaderboard en Tiempo Real**: Actualización automática con Supabase
- **Top Jugadores**: Muestra los mejores puntajes verificados
- **Estadísticas**: Puntaje promedio, preguntas correctas, fecha de envío
- **Perfiles de Usuario**: Avatares y nombres de usuario

### 🔐 Autenticación Segura

- **Registro e Inicio de Sesión**: Con validación de formularios
- **JWT Tokens**: Sesiones seguras con Passport.js
- **Protección de Rutas**: Guards para páginas privadas
- **Hash de Contraseñas**: bcrypt con salt rounds

### 📚 Contenido Educativo

- **8 Secciones Temáticas**: Basadas en documental educativo
- **Navegación Intuitiva**: Cards con vista previa y animaciones
- **Responsive Design**: Adaptado a móvil, tablet y desktop
- **Material Multimedia**: Texto, imágenes y videos

---

## 🏗️ Arquitectura

```mermaid
graph TB
    A[👤 Usuario] -->|Juega| B[🎮 Frontend Next.js]
    B -->|API Calls| C[🔧 Backend NestJS]
    C -->|Query/Insert| D[(🗄️ Supabase PostgreSQL)]
    C -->|AI Chat| E[🤖 Groq API - Llama 3.3 70B]
    B -->|Realtime| D
    C -->|HMAC Verify| F[🔐 HMAC Service]
    C -.->|Dev Only| G[🐍 Python AI Service Local]
    
    style A fill:#667eea
    style B fill:#48bb78
    style C fill:#ed8936
    style D fill:#38b2ac
    style E fill:#9f7aea
    style F fill:#f56565
    style G fill:#ffd700
```

### Flujo de Datos

1. **Usuario juega** en el frontend (Three.js 3D)
2. **Frontend genera código** HMAC con resultados
3. **Backend valida** el código HMAC
4. **Si es válido**, guarda en Supabase
5. **Leaderboard actualiza** en tiempo real
6. **Chatbot procesa** preguntas con Groq API (Llama 3.3 70B)

---

## 🚀 Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ⚛️ **Next.js** | 16.0 | Framework React con App Router |
| 📘 **TypeScript** | 5.3 | Tipado estático |
| 🎨 **Tailwind CSS** | 3.4 | Estilos utility-first |
| 🎭 **Framer Motion** | 11.0 | Animaciones fluidas |
| 🎲 **Three.js** | 0.180 | Gráficos 3D WebGL |
| 🎯 **React Three Fiber** | 9.4 | React renderer para Three.js |
| 📦 **Zustand** | 4.5 | State management ligero |
| 📋 **React Hook Form** | 7.50 | Manejo de formularios |
| ✅ **Zod** | 3.22 | Validación de esquemas |
| 🎨 **Lucide React** | 0.330 | Iconos modernos |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| 🔴 **NestJS** | 10.0 | Framework Node.js escalable |
| 📘 **TypeScript** | 5.1 | Tipado estático |
| 🗄️ **Supabase** | 2.39 | Base de datos PostgreSQL |
| 🔑 **JWT** | 10.2 | Autenticación con tokens |
| 🛡️ **Passport** | 0.7 | Estrategias de autenticación |
| 🔐 **bcrypt** | 5.1 | Hash de contraseñas |
| 🤖 **Groq SDK** | 0.10 | API para Llama 3.3 70B |
| ✅ **class-validator** | 0.14 | Validación de DTOs |
| 🔄 **RxJS** | 7.8 | Programación reactiva |

### AI Services

| Servicio | Estado | Propósito |
|----------|--------|-----------|
| 🚀 **Groq API** | ✅ Producción | Llama 3.3 70B para chatbot |
| 🐍 **Python AI Service** | 🛠️ Dev Opcional | Transformers local (Flask) |

### Base de Datos

- 🐘 **PostgreSQL** (via Supabase)
- 🔒 **Row Level Security (RLS)**
- ⚡ **Realtime subscriptions**
- 📈 **Indexes optimizados**
- 🔄 **Migrations versionadas**

### Herramientas

- 🧪 **Jest** - Testing unitario
- 🎨 **Prettier** - Code formatting
- 🔍 **ESLint** - Linting
- 📝 **PostCSS** - CSS processing

---

## 📦 Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- 📦 **Node.js** 18+ y npm/pnpm
- 🗄️ Cuenta en **[Supabase](https://supabase.com)** (gratis)
- 🔑 Cuenta en **[Groq](https://groq.com)** para API key (gratis)
- 💻 **Git** para clonar el repositorio
- 🐍 **Python 3.10+** (opcional, solo para desarrollo local con AI service)

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/AnderssonProgramming/psoc-genericR-culturalC.git
cd psoc-genericR-culturalC
```

### 2️⃣ Configurar Backend

```bash
cd back

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env
```

Edita `back/.env` con tus credenciales:

```env
# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_KEY=tu-service-key-aqui

# JWT Configuration
JWT_SECRET=genera-uno-con-openssl-rand-base64-32

# HMAC Secret (para verificar códigos del juego)
HMAC_SECRET=genera-otro-con-openssl-rand-base64-32

# Groq AI Configuration (REQUERIDO para chatbot)
GROQ_API_KEY=gsk_tu-api-key-aqui

# Python AI Service (OPCIONAL - Solo para desarrollo local)
USE_LOCAL_MODEL=false
PYTHON_AI_SERVICE_URL=http://localhost:5000

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Generar secrets seguros:**

```bash
# En Linux/Mac
openssl rand -base64 32

# En Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3️⃣ Configurar Base de Datos (Supabase)

1. Crea un proyecto en [Supabase](https://app.supabase.com)
2. Ve a **SQL Editor** en el dashboard
3. Ejecuta el contenido de `back/supabase/migrations/001_initial_schema.sql`
4. Verifica que las tablas se hayan creado correctamente

### 4️⃣ Configurar Frontend

```bash
cd ../front

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.local.example .env.local
```

Edita `front/.env.local`:

```env
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Supabase Configuration (mismas que el backend)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 5️⃣ Iniciar Servidores de Desarrollo

**Terminal 1 - Backend:**

```bash
cd back
npm run start:dev
```

✅ Backend corriendo en: `http://localhost:3001/api`

**Terminal 2 - Frontend:**

```bash
cd front
npm run dev
```

✅ Frontend corriendo en: `http://localhost:3000`

### 6️⃣ Verificar Instalación

1. Abre tu navegador en `http://localhost:3000`
2. Regístrate como nuevo usuario
3. Inicia sesión
4. Prueba el juego en `/game`
5. Interactúa con el chatbot (botón flotante)
6. Revisa el leaderboard en `/leaderboard`
7. Explora las secciones educativas en `/sections`

---

## 🎮 Uso

### 🎯 Para Jugadores

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Jugar**: Ve a `/game` y responde las 30 preguntas
3. **Ver Resultados**: Al finalizar, verás tu puntaje y estadísticas
4. **Ranking**: Compite en el leaderboard global
5. **Chatbot**: Pregunta sobre roles de género en cualquier página
6. **Secciones**: Explora contenido educativo adicional

### 👩‍🏫 Para Educadores

1. **Asignar Tareas**: Pide a estudiantes completar el juego
2. **Monitorear Progreso**: Revisa el leaderboard para ver participación
3. **Facilitar Discusiones**: Usa el chatbot para responder preguntas
4. **Contenido Complementario**: Utiliza las 8 secciones educativas
5. **Gamificación**: Crea desafíos basados en los puntajes

---

## 📂 Estructura del Proyecto

```
psoc-genericR-culturalC/
│
├── 📁 front/                      # Frontend Next.js
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── page.tsx               # 🏠 Landing page
│   │   ├── layout.tsx             # Layout global
│   │   ├── globals.css            # Estilos globales
│   │   ├── 📁 login/              # 🔐 Página de login
│   │   ├── 📁 register/           # ✍️ Página de registro
│   │   ├── 📁 game/               # 🎮 Juego interactivo
│   │   │   ├── QuizGameClient.tsx # Cliente del juego principal
│   │   │   ├── ThreeScene.tsx     # Escena 3D con Three.js
│   │   │   ├── WelcomeScreen.tsx  # Pantalla de bienvenida
│   │   │   ├── QuizCard.tsx       # Tarjeta de pregunta
│   │   │   └── ResultsScreen.tsx  # Pantalla de resultados
│   │   ├── 📁 leaderboard/        # 🏆 Ranking global
│   │   ├── 📁 chat/               # 💬 Página de chat
│   │   └── 📁 sections/           # 📚 Secciones educativas
│   ├── 📁 components/             # Componentes reutilizables
│   │   ├── NavBar.tsx             # Barra de navegación
│   │   └── FloatingChatbot.tsx    # Chatbot flotante
│   ├── 📁 lib/                    # Utilidades y configuración
│   │   ├── api.ts                 # Cliente API (axios)
│   │   ├── supabase.ts            # Cliente Supabase
│   │   ├── auth-context.tsx       # Context de autenticación
│   │   ├── theme.ts               # Configuración de tema
│   │   └── utils.ts               # Helpers y utilidades
│   ├── 📁 public/                 # Archivos estáticos
│   ├── package.json               # Dependencias frontend
│   ├── tsconfig.json              # Configuración TypeScript
│   ├── tailwind.config.ts         # Configuración Tailwind
│   └── next.config.js             # Configuración Next.js
│
├── 📁 back/                       # Backend NestJS
│   ├── 📁 src/                    # Código fuente
│   │   ├── main.ts                # Entry point
│   │   ├── app.module.ts          # Módulo raíz
│   │   ├── 📁 auth/               # 🔐 Módulo de autenticación
│   │   │   ├── auth.service.ts    # Lógica de auth (JWT, bcrypt)
│   │   │   ├── auth.controller.ts # Endpoints /register, /login
│   │   │   ├── jwt.strategy.ts    # Estrategia JWT Passport
│   │   │   ├── jwt-auth.guard.ts  # Guard para rutas protegidas
│   │   │   └── 📁 dto/            # DTOs de autenticación
│   │   ├── 📁 quiz/               # 🎯 Módulo de quiz
│   │   │   ├── quiz.service.ts    # Lógica del juego
│   │   │   └── quiz.controller.ts # Endpoints del quiz
│   │   ├── 📁 scores/             # 📊 Módulo de puntajes
│   │   │   ├── scores.service.ts  # Verificación HMAC, guardado
│   │   │   ├── scores.controller.ts # POST /scores
│   │   │   └── 📁 dto/            # DTOs de scores
│   │   ├── 📁 leaderboard/        # 🏆 Módulo de ranking
│   │   │   ├── leaderboard.service.ts
│   │   │   └── leaderboard.controller.ts # GET /leaderboard
│   │   ├── 📁 chat/               # 💬 Módulo de chatbot
│   │   │   ├── chat.service.ts    # Integración OpenAI
│   │   │   ├── chat.controller.ts # POST /chat
│   │   │   └── 📁 dto/            # DTOs de chat
│   │   ├── 📁 common/             # 🛠️ Servicios compartidos
│   │   │   └── hmac.service.ts    # Verificación HMAC-SHA256
│   │   └── 📁 supabase/           # 🗄️ Módulo Supabase
│   │       └── supabase.module.ts # Cliente Supabase provider
│   ├── 📁 supabase/migrations/    # Migraciones SQL
│   │   └── 001_initial_schema.sql # Schema inicial
│   ├── 📁 migrations/             # Migraciones adicionales
│   │   └── 004_create_game_codes.sql
│   ├── package.json               # Dependencias backend
│   ├── tsconfig.json              # Configuración TypeScript
│   ├── nest-cli.json              # Configuración NestJS CLI
│   └── jest.config.js             # Configuración Jest
│
├── 📄 README.md                   # Este archivo
├── 📄 LICENSE                     # Licencia MIT
└── 📄 sections.txt                # Contenido de secciones
```

---

## 🔌 API Endpoints

### 🔐 Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | No |
| `POST` | `/api/auth/login` | Iniciar sesión y obtener JWT | No |
| `GET` | `/api/auth/profile` | Obtener perfil del usuario | Sí |

**Ejemplo - Registro:**

```json
POST /api/auth/register
{
  "username": "jugador123",
  "email": "jugador@example.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "id": "uuid-here",
  "username": "jugador123",
  "email": "jugador@example.com",
  "created_at": "2025-10-27T10:30:00Z"
}
```

### 🎯 Quiz

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/quiz/questions` | Obtener preguntas del quiz | Sí |
| `POST` | `/api/quiz/submit` | Enviar respuestas del quiz | Sí |

### 📊 Puntajes

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/scores` | Enviar y verificar código HMAC | Sí |
| `GET` | `/api/scores/user/:userId` | Obtener puntajes de un usuario | Sí |

**Ejemplo - Enviar Score:**

```json
POST /api/scores
{
  "submission_code": "user123|850|28|30|1730024400|a3d8f9e2c1b0..."
}
```

### 🏆 Leaderboard

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/leaderboard` | Top 50 jugadores | No |
| `GET` | `/api/leaderboard/stats` | Estadísticas globales | No |

**Respuesta Leaderboard:**

```json
[
  {
    "id": "uuid",
    "username": "jugador123",
    "score": 950,
    "correct_answers": 29,
    "total_questions": 30,
    "submitted_at": "2025-10-27T10:30:00Z"
  }
]
```

### 💬 Chatbot

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/chat` | Enviar mensaje al chatbot AI | Sí |
| `GET` | `/api/chat/history` | Obtener historial de chat | Sí |

**Ejemplo - Chat:**

```json
POST /api/chat
{
  "message": "¿Qué son los roles de género?"
}
```

---

## 🗄️ Base de Datos

### Schema PostgreSQL (Supabase)

#### Tabla: `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabla: `scores`

```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  submission_code TEXT UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabla: `chat_sessions`

```sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabla: `analytics_events`

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Índices Optimizados

```sql
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_score ON scores(score DESC);
CREATE INDEX idx_scores_verified ON scores(verified);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
```

### Row Level Security (RLS)

```sql
-- Usuarios pueden leer su propia información
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Todos pueden leer scores verificados (leaderboard)
CREATE POLICY "Anyone can read verified scores" ON scores
  FOR SELECT USING (verified = true);

-- Usuarios solo pueden insertar sus propios scores
CREATE POLICY "Users can insert own scores" ON scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 🔐 Seguridad

### Verificación de Códigos HMAC

**Algoritmo de Verificación:**

1. **Frontend genera código**:
   ```
   username|score|correct|total|timestamp|hmac_hash
   ```

2. **Backend verifica**:
   ```typescript
   const payload = `${username}|${score}|${correct}|${total}|${timestamp}`;
   const expectedHash = crypto
     .createHmac('sha256', HMAC_SECRET)
     .update(payload)
     .digest('hex');
   
   if (hash !== expectedHash) throw new Error('Invalid code');
   ```

3. **Validaciones adicionales**:
   - ✅ Timestamp no mayor a 7 días
   - ✅ Código único (no usado previamente)
   - ✅ Usuario autenticado válido

### Autenticación JWT

- 🔑 **Tokens firmados** con HS256
- ⏰ **Expiración**: 7 días
- 🛡️ **Refresh tokens**: Para sesiones largas
- 🔒 **Guards**: Protección de rutas sensibles

### Hash de Contraseñas

```typescript
// Registro
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(password, salt);

// Login
const isMatch = await bcrypt.compare(password, user.password_hash);
```

### CORS

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

---

## 🧪 Testing

### Backend Tests

```bash
cd back

# Ejecutar todos los tests
npm run test

# Tests con watch mode
npm run test:watch

# Cobertura de tests
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend Tests (Futuro)

```bash
cd front

# Unit tests con Jest
npm run test

# Tests con watch mode
npm run test:watch

# E2E tests con Playwright
npm run test:e2e
```

---

## 🚀 Despliegue

### Opción 1: Vercel + Railway

**Frontend (Vercel):**

1. Conecta tu repo de GitHub a [Vercel](https://vercel.com)
2. Configura variables de entorno
3. Deploy automático en cada push

**Backend (Railway):**

1. Crea un proyecto en [Railway](https://railway.app)
2. Conecta tu repo y selecciona la carpeta `back/`
3. Configura variables de entorno
4. Deploy automático

### Opción 2: Render

**Backend:**

```yaml
# render.yaml
services:
  - type: web
    name: gender-quest-api
    env: node
    buildCommand: cd back && npm install && npm run build
    startCommand: cd back && npm run start:prod
    envVars:
      - key: SUPABASE_URL
        sync: false
      - key: OPENAI_API_KEY
        sync: false
```

**Frontend:**

```yaml
services:
  - type: web
    name: gender-quest-web
    env: node
    buildCommand: cd front && npm install && npm run build
    startCommand: cd front && npm run start
```

### Opción 3: Docker

```dockerfile
# Dockerfile (backend)
FROM node:18-alpine
WORKDIR /app
COPY back/package*.json ./
RUN npm install
COPY back/ ./
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

```dockerfile
# Dockerfile (frontend)
FROM node:18-alpine
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build
CMD ["npm", "run", "start"]
```

**Docker Compose:**

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    env_file:
      - back/.env
  
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    env_file:
      - front/.env.local
    depends_on:
      - backend
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este es un proyecto educativo de código abierto.

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Haz tus cambios** y commitea:
   ```bash
   git commit -m '✨ Agrega nueva funcionalidad'
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abre un Pull Request** en GitHub

### Estándares de Código

- ✅ Usa **TypeScript** para todo el código
- 📝 Agrega **comentarios** para lógica compleja
- 🧪 Incluye **tests** para nuevas features
- 🎨 Sigue las convenciones de **Prettier** y **ESLint**
- 📖 Actualiza la **documentación** si es necesario

### Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/issues) con:

- 📝 Descripción del problema
- 🔄 Pasos para reproducir
- 💻 Entorno (OS, Node version, navegador)
- 📸 Screenshots si aplica

---

## 📝 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ve el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Gender Quest

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para 
utilizar el Software sin restricciones, incluyendo sin limitación los derechos 
a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o 
vender copias del Software...
```

---

## 👥 Autores

Proyecto desarrollado como parte de una iniciativa educativa sobre igualdad de género.

- 💻 **Desarrollo**: [AnderssonProgramming](https://github.com/AnderssonProgramming)
- 🎨 **Diseño**: Equipo Gender Quest
- 📚 **Contenido Educativo**: Basado en documental sobre roles de género

---

## 🆘 Soporte

¿Necesitas ayuda? Aquí hay algunas opciones:

- 📖 **Documentación**: Lee los READMEs de [backend](./back/README.md) y [frontend](./front/README.md)
- 🐛 **Issues**: [Reporta bugs o solicita features](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/issues)
- 💬 **Discusiones**: [Únete a las discusiones](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/discussions)
- 📧 **Email**: Contacta al equipo (especificar email)

### FAQ

**P: ¿El juego funciona en móviles?**  
R: Sí, el frontend es totalmente responsive, pero para mejor experiencia 3D recomendamos desktop.

**P: ¿Necesito pagar por el chatbot AI?**  
R: No, usamos Ollama que es completamente gratuito y corre localmente en tu máquina. Solo necesitas descargar el modelo.

**P: ¿Puedo usar esto para mi clase?**  
R: ¡Absolutamente! El proyecto es open source y está diseñado para uso educativo.

---

## 🎯 Roadmap

### ✅ Completado

- [x] Sistema de autenticación JWT
- [x] Juego 3D con Three.js
- [x] Chatbot AI con GPT-4
- [x] Leaderboard en tiempo real
- [x] 8 secciones educativas
- [x] Verificación HMAC de códigos
- [x] Diseño responsive

### 🚧 En Progreso

- [ ] Tests E2E completos
- [ ] Dashboard de analíticas para educadores
- [ ] Exportación de datos (CSV/PDF)

### 🔮 Futuro

- [ ] Integración con Unity WebGL para jugar en navegador
- [ ] Sistema de logros y badges
- [ ] Multi-idioma (i18n - Inglés, Francés, Portugués)
- [ ] Modo oscuro completo
- [ ] PWA para uso offline
- [ ] Sistema de notificaciones push
- [ ] Grupos y aulas virtuales
- [ ] Estadísticas avanzadas de progreso
- [ ] Integración con LMS (Moodle, Canvas)

---

<div align="center">

### 🌟 Si este proyecto te ha sido útil, considera darle una ⭐ en GitHub

**Gender Quest** - Jugando aprendemos igualdad 🎮✨

[🏠 Inicio](#) • [📖 Docs](#-tabla-de-contenidos) • [🐛 Issues](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/issues) • [💬 Discusiones](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/discussions)

---

Hecho con ❤️ para la educación en igualdad de género

</div>

