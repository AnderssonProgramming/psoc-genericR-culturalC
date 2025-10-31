<div align="center">

# 🔴 Gender Quest - Backend API

### API REST con NestJS + Supabase + Groq AI

[![NestJS](https://img.shields.io/badge/NestJS-10.0-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39-3ECF8E?logo=supabase)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-9f7aea)](https://groq.com/)
[![Jest](https://img.shields.io/badge/Jest-29.5-C21325?logo=jest)](https://jestjs.io/)

*API robusta y segura para la plataforma educativa Gender Quest*

**🚀 Despliegue en Producción**: [https://psoc-genericr-culturalc-production.up.railway.app/api](https://psoc-genericr-culturalc-production.up.railway.app/api)

[📖 Documentación Principal](../README.md) | [🌐 Frontend](../front/README.md) | [🔌 API Endpoints](#-endpoints)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Arquitectura](#️-arquitectura)
- [Tecnologías](#-tecnologías)
- [Módulos](#-módulos)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Base de Datos](#-base-de-datos)
- [Endpoints](#-endpoints)
- [Seguridad](#-seguridad)
- [Testing](#-testing)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)

---

## 🎯 Descripción

El **backend de Gender Quest** es una API REST construida con **NestJS** que proporciona:

- 🔐 **Autenticación y autorización** con JWT
- 🎮 **Gestión de quiz y preguntas** educativas
- 📊 **Sistema de puntajes** con verificación HMAC-SHA256
- 🏆 **Leaderboard en tiempo real** con Supabase
- 🤖 **Chatbot AI** con Groq API (Llama 3.3 70B)
- 🗄️ **Base de datos PostgreSQL** con Supabase
- 🛡️ **Seguridad robusta** con bcrypt, JWT y RLS

### Características Clave

✅ **Validación automática** de DTOs con `class-validator`  
✅ **AI Integration** con Groq SDK (Llama 3.3 70B)  
✅ **Python AI Service** opcional para desarrollo local  
✅ **CORS configurado** para frontend  
✅ **Global prefix** `/api` para todos los endpoints  
✅ **Error handling** centralizado  
✅ **Testing** con Jest  
✅ **TypeScript** para type-safety completo

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│                    http://localhost:3000                     │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (NestJS)                       │
│                  http://localhost:3001/api                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Module  │  │ Quiz Module  │  │ Chat Module  │      │
│  │   (JWT)      │  │  (Questions) │  │  (OpenAI)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Scores Module │  │Leaderboard   │  │   Common     │      │
│  │  (HMAC)      │  │   Module     │  │  (HMAC Svc)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────┬──────────────────────────┬──────────────────┘
                │                          │
                ▼                          ▼
    ┌───────────────────────┐  ┌───────────────────────┐
    │ Supabase (PostgreSQL) │  │   OpenAI API (GPT-4)  │
    │   + Realtime + RLS    │  │   Chat Completions    │
    └───────────────────────┘  └───────────────────────┘
```

### Flujo de Datos Principal

1. **Usuario hace login** → Auth Module valida y genera JWT
2. **Usuario juega quiz** → Frontend envía respuestas
3. **Frontend genera código HMAC** → Scores Module valida
4. **Si código es válido** → Guarda en Supabase
5. **Leaderboard actualiza** → Supabase Realtime notifica frontend
6. **Usuario pregunta al chatbot** → Chat Module llama Groq API (Llama 3.3 70B)
7. **Respuesta se guarda** → Chat session en Supabase

---

## 🚀 Tecnologías

### Framework y Lenguaje

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **NestJS** | 10.0 | Framework progresivo de Node.js |
| **TypeScript** | 5.1 | Superset de JavaScript tipado |
| **Node.js** | 18+ | Runtime de JavaScript |

### Librerías Core

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `@nestjs/common` | 10.0 | Decoradores y utilidades comunes |
| `@nestjs/core` | 10.0 | Core de NestJS |
| `@nestjs/platform-express` | 10.0 | Adaptador Express |
| `@nestjs/config` | 3.1 | Gestión de variables de entorno |

### Autenticación y Seguridad

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `@nestjs/jwt` | 10.2 | Generación y validación JWT |
| `@nestjs/passport` | 10.0 | Estrategias de autenticación |
| `passport` | 0.7 | Middleware de autenticación |
| `passport-jwt` | 4.0 | Estrategia JWT para Passport |
| `bcrypt` | 5.1 | Hash de contraseñas |

### Base de Datos

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `@supabase/supabase-js` | 2.39 | Cliente oficial de Supabase |

### Inteligencia Artificial

| Servicio/Librería | Versión | Propósito |
|-------------------|---------|-----------|
| **Groq SDK** | 0.10.0 | API para Llama 3.3 70B (Producción) |
| **Python AI Service** | - | Transformers locales (Dev opcional) |

**Nota**: Groq API se utiliza en producción. Python AI Service es opcional para desarrollo local sin dependencias de API.

### Validación

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `class-validator` | 0.14 | Validación de DTOs |
| `class-transformer` | 0.5 | Transformación de objetos |

### Testing

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `jest` | 29.5 | Framework de testing |
| `@nestjs/testing` | 10.0 | Utilidades para testear NestJS |
| `ts-jest` | 29.1 | Preset de Jest para TypeScript |

---

## 📦 Módulos

### 🔐 Auth Module (`src/auth/`)

**Responsabilidad**: Autenticación y autorización de usuarios

**Archivos**:
- `auth.service.ts` - Lógica de registro, login, validación
- `auth.controller.ts` - Endpoints REST
- `jwt.strategy.ts` - Estrategia JWT Passport
- `jwt-auth.guard.ts` - Guard para proteger rutas
- `dto/auth.dto.ts` - DTOs de registro/login

**Endpoints**:
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (protegido)

**Flujo**:
```typescript
// 1. Usuario se registra
register(dto) -> hashPassword(bcrypt) -> saveToSupabase() -> returnUser

// 2. Usuario hace login
login(dto) -> validatePassword(bcrypt) -> generateJWT() -> returnToken

// 3. Usuario accede a ruta protegida
request -> JwtAuthGuard -> validateToken -> extractUser -> continue
```

---

### 🎯 Quiz Module (`src/quiz/`)

**Responsabilidad**: Gestión de preguntas y lógica del quiz

**Archivos**:
- `quiz.service.ts` - Lógica del quiz
- `quiz.controller.ts` - Endpoints REST

**Endpoints**:
- `GET /api/quiz/questions` - Obtener preguntas (autenticado)
- `POST /api/quiz/submit` - Enviar respuestas (autenticado)

**Features**:
- ✅ Preguntas sobre mujeres destacadas
- ✅ Validación de respuestas
- ✅ Cálculo de puntaje

---

### 📊 Scores Module (`src/scores/`)

**Responsabilidad**: Verificación HMAC y guardado de puntajes

**Archivos**:
- `scores.service.ts` - Verificación HMAC, validación
- `scores.controller.ts` - Endpoints REST
- `dto/score.dto.ts` - DTOs de puntaje

**Endpoints**:
- `POST /api/scores` - Enviar código HMAC (autenticado)
- `GET /api/scores/user/:userId` - Puntajes de usuario (autenticado)

**Verificación HMAC**:

```typescript
// Código del frontend: username|score|correct|total|timestamp|hash

verify(code) {
  1. Split código por '|'
  2. Extraer: username, score, correct, total, timestamp, hash
  3. Recalcular: expectedHash = HMAC-SHA256(payload, secret)
  4. Validar: hash === expectedHash
  5. Validar: timestamp < 7 días
  6. Validar: código único (no usado antes)
  7. Si todo OK: guardar en DB con verified=true
}
```

---

### 🏆 Leaderboard Module (`src/leaderboard/`)

**Responsabilidad**: Ranking de mejores jugadores

**Archivos**:
- `leaderboard.service.ts` - Lógica del ranking
- `leaderboard.controller.ts` - Endpoints REST

**Endpoints**:
- `GET /api/leaderboard` - Top 50 jugadores (público)
- `GET /api/leaderboard/stats` - Estadísticas globales (público)

**Query Optimizada**:

```sql
SELECT 
  s.id,
  s.score,
  s.correct_answers,
  s.total_questions,
  s.submitted_at,
  u.username,
  u.avatar_url
FROM scores s
JOIN users u ON s.user_id = u.id
WHERE s.verified = true
ORDER BY s.score DESC, s.submitted_at ASC
LIMIT 50;
```

---

### 💬 Chat Module (`src/chat/`)

**Responsabilidad**: Chatbot educativo con Groq AI (Llama 3.3 70B)

**Archivos**:
- `chat.service.ts` - Integración con Groq API y Python AI Service
- `chat.controller.ts` - Endpoints REST y diagnóstico
- `dto/chat.dto.ts` - DTOs de chat

**Endpoints**:
- `POST /api/chat` - Enviar mensaje (autenticado)
- `GET /api/chat/history` - Obtener historial (autenticado)
- `GET /api/chat/config` - Configuración y diagnóstico AI

**Configuración Groq API** (Producción):

```typescript
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${this.groqApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente educativo especializado en roles de género...'
      },
      ...previousMessages,
      { role: 'user', content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 500
  })
});
```

**Python AI Service** (Desarrollo Local Opcional):

```bash
cd python-ai-service
pip install -r requirements.txt
python app.py  # Puerto 5000
```

**Flujo de Decisión AI**:

1. Si `USE_LOCAL_MODEL=true` → Llama a Python AI Service (localhost:5000)
2. Si `GROQ_API_KEY` está configurada → Llama a Groq API (producción)
3. Si ambas fallan → Retorna respuesta demo
    {
      role: 'system',
      content: 'Eres un asistente educativo experto en roles de género...'
    },
    { role: 'user', content: userMessage }
  ],
  temperature: 0.7,
  max_tokens: 500,
});
```

---

### 🛠️ Common Module (`src/common/`)

**Responsabilidad**: Servicios compartidos

**Archivos**:
- `hmac.service.ts` - Servicio de verificación HMAC

**Métodos**:

```typescript
class HmacService {
  // Genera hash HMAC-SHA256
  generate(payload: string): string {
    return crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
  }

  // Verifica hash HMAC
  verify(payload: string, hash: string): boolean {
    const expectedHash = this.generate(payload);
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(expectedHash)
    );
  }
}
```

---

### 🗄️ Supabase Module (`src/supabase/`)

**Responsabilidad**: Integración con Supabase

**Archivos**:
- `supabase.module.ts` - Provider del cliente Supabase

**Configuración**:

```typescript
@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: () => {
        return createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_KEY
        );
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
```

---

## 📦 Instalación

### 1️⃣ Prerrequisitos

Asegúrate de tener instalado:

- ✅ **Node.js 18+** (recomendado: LTS)
- ✅ **npm** o **pnpm**
- ✅ **Proyecto Supabase** creado
- ✅ **Groq API Key** desde [console.groq.com](https://console.groq.com) (gratis)
- ✅ **Python 3.10+** (opcional, solo para Python AI Service local)

### 2️⃣ Instalar Dependencias

```bash
# Navega al directorio del backend
cd back

# Instala las dependencias
npm install

# O con pnpm (más rápido)
pnpm install
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz de `back/`:

```bash
# Copia el ejemplo (si existe)
cp .env.example .env
```

Edita `back/.env`:

```env
# ==========================================
# SUPABASE CONFIGURATION
# ==========================================
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ==========================================
# JWT CONFIGURATION
# ==========================================
JWT_SECRET=tu-secret-super-seguro-aqui-32-chars-min
JWT_EXPIRES_IN=7d

# ==========================================
# HMAC SECRET (para verificar códigos del juego)
# ==========================================
HMAC_SECRET=otro-secret-super-seguro-diferente-32-chars

# ==========================================
# GROQ AI CONFIGURATION (REQUERIDO)
# ==========================================
GROQ_API_KEY=gsk_tu-api-key-desde-console-groq-com

# ==========================================
# PYTHON AI SERVICE (OPCIONAL - Solo desarrollo local)
# ==========================================
USE_LOCAL_MODEL=false
PYTHON_AI_SERVICE_URL=http://localhost:5000

# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 🔑 Generar Secrets Seguros

**En Linux/Mac/Git Bash:**

```bash
openssl rand -base64 32
```

**En Windows PowerShell:**

```powershell
# Generar JWT_SECRET
$bytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Repetir para HMAC_SECRET
```

### 📍 Dónde Obtener las Claves

| Variable | Dónde Obtenerla |
|----------|-----------------|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → `anon` `public` |
| `SUPABASE_SERVICE_KEY` | Supabase Dashboard → Settings → API → `service_role` `secret` |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → Create API Key (gratis) |
| `PYTHON_AI_SERVICE_URL` | URL del Python AI Service local (default: http://localhost:5000) |

---

## 🗄️ Base de Datos

### Setup Inicial

1. **Crear proyecto en Supabase**: [supabase.com](https://app.supabase.com)

2. **Aplicar Schema SQL**:
   - Ve a **SQL Editor** en Supabase
   - Copia el contenido de `back/supabase/migrations/001_initial_schema.sql`
   - Ejecuta el script

3. **Verificar Tablas**:
   - Ve a **Table Editor**
   - Deberías ver: `users`, `scores`, `chat_sessions`, `analytics_events`

### Schema Completo

El schema incluye:

- ✅ **4 Tablas**: users, scores, chat_sessions, analytics_events
- ✅ **Índices optimizados** para queries frecuentes
- ✅ **Row Level Security (RLS)** habilitado
- ✅ **Políticas de seguridad** para cada tabla
- ✅ **Función SQL**: `get_average_score()`
- ✅ **Foreign keys** con CASCADE delete

Ver detalles completos en [Documentación Principal](../README.md#-base-de-datos).

### Migraciones Adicionales

Si necesitas aplicar más migraciones:

```bash
# Revisa los archivos en:
back/migrations/

# Aplica manualmente en SQL Editor de Supabase
```

---

## 🔌 Endpoints

Todos los endpoints están prefijados con `/api`.

**Base URL**: `http://localhost:3001/api`

### 🔐 Autenticación

#### **POST** `/api/auth/register`

Registra un nuevo usuario.

**Body**:

```json
{
  "username": "jugador123",
  "email": "jugador@example.com",
  "password": "password123"
}
```

**Respuesta 201**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "jugador123",
  "email": "jugador@example.com",
  "created_at": "2025-10-27T10:30:00Z"
}
```

---

#### **POST** `/api/auth/login`

Inicia sesión y obtiene JWT.

**Body**:

```json
{
  "email": "jugador@example.com",
  "password": "password123"
}
```

**Respuesta 200**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "jugador123",
    "email": "jugador@example.com"
  }
}
```

---

#### **GET** `/api/auth/profile` 🔒

Obtiene el perfil del usuario autenticado.

**Headers**:

```
Authorization: Bearer <tu-jwt-token>
```

**Respuesta 200**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "jugador123",
  "email": "jugador@example.com",
  "avatar_url": "https://...",
  "created_at": "2025-10-27T10:30:00Z"
}
```

---

### 🎯 Quiz

#### **GET** `/api/quiz/questions` 🔒

Obtiene las preguntas del quiz.

**Headers**:

```
Authorization: Bearer <tu-jwt-token>
```

**Respuesta 200**:

```json
[
  {
    "id": "q1",
    "question": "¿Quién fue la primera mujer en ganar un Premio Nobel?",
    "options": ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Jane Goodall"],
    "correct": "Marie Curie",
    "category": "science"
  }
]
```

---

### 📊 Puntajes

#### **POST** `/api/scores` 🔒

Envía código HMAC para verificación y guardado.

**Headers**:

```
Authorization: Bearer <tu-jwt-token>
```

**Body**:

```json
{
  "submission_code": "jugador123|950|29|30|1730024400|a3d8f9e2c1b0d4f8..."
}
```

**Respuesta 201**:

```json
{
  "id": "score-uuid",
  "user_id": "user-uuid",
  "score": 950,
  "correct_answers": 29,
  "total_questions": 30,
  "verified": true,
  "submitted_at": "2025-10-27T10:30:00Z"
}
```

**Error 400** (Código inválido):

```json
{
  "statusCode": 400,
  "message": "Invalid HMAC code",
  "error": "Bad Request"
}
```

---

### 🏆 Leaderboard

#### **GET** `/api/leaderboard`

Obtiene el ranking global (top 50).

**Query Params** (opcionales):
- `limit` (default: 50)
- `offset` (default: 0)

**Respuesta 200**:

```json
[
  {
    "id": "score-uuid",
    "username": "jugador123",
    "score": 950,
    "correct_answers": 29,
    "total_questions": 30,
    "submitted_at": "2025-10-27T10:30:00Z",
    "avatar_url": "https://..."
  }
]
```

---

#### **GET** `/api/leaderboard/stats`

Obtiene estadísticas globales.

**Respuesta 200**:

```json
{
  "total_players": 1523,
  "total_games": 4892,
  "average_score": 750,
  "highest_score": 1000
}
```

---

### 💬 Chatbot

#### **POST** `/api/chat` 🔒

Envía mensaje al chatbot AI.

**Headers**:

```
Authorization: Bearer <tu-jwt-token>
```

**Body**:

```json
{
  "message": "¿Qué son los roles de género?"
}
```

**Respuesta 200**:

```json
{
  "reply": "Los roles de género son expectativas sociales sobre cómo deben comportarse las personas según su género...",
  "timestamp": "2025-10-27T10:30:00Z"
}
```

---

#### **GET** `/api/chat/history` 🔒

Obtiene el historial de conversación del usuario.

**Headers**:

```
Authorization: Bearer <tu-jwt-token>
```

**Respuesta 200**:

```json
{
  "session_id": "session-uuid",
  "messages": [
    {
      "role": "user",
      "content": "¿Qué son los roles de género?",
      "timestamp": "2025-10-27T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Los roles de género son...",
      "timestamp": "2025-10-27T10:30:05Z"
    }
  ]
}
```

---

## 🔐 Seguridad

### Autenticación JWT

```typescript
// JWT Payload
{
  sub: userId,  // Subject (user ID)
  username: string,
  email: string,
  iat: number,  // Issued at
  exp: number   // Expiration
}
```

**Estrategia**:
- Algoritmo: **HS256** (HMAC SHA-256)
- Expiración: **7 días** (configurable)
- Validación automática en guards

### Verificación HMAC-SHA256

**Algoritmo**:

```typescript
const payload = `${username}|${score}|${correct}|${total}|${timestamp}`;
const hash = crypto
  .createHmac('sha256', HMAC_SECRET)
  .update(payload)
  .digest('hex');
```

**Validaciones**:
1. ✅ Hash HMAC coincide
2. ✅ Timestamp < 7 días
3. ✅ Código único (no duplicado)
4. ✅ Usuario existe y está autenticado

### Hash de Contraseñas

```typescript
// Registro
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

// Login
const isValid = await bcrypt.compare(password, hash);
```

**Configuración**:
- Algoritmo: **bcrypt**
- Salt rounds: **10**
- Hash length: 60 caracteres

### CORS

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Validación de Entrada

```typescript
// Todas las rutas validan DTOs automáticamente
@Post()
async create(@Body() dto: CreateScoreDto) {
  // DTO ya validado por ValidationPipe
}
```

### Row Level Security (RLS)

Supabase RLS asegura que:
- ✅ Usuarios solo leen sus propios datos
- ✅ Scores verificados son públicos
- ✅ Chat sessions son privados
- ✅ No hay acceso directo sin autenticación

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Unit tests
npm run test

# Watch mode (desarrollo)
npm run test:watch

# Cobertura de tests
npm run test:cov

# Ver reporte HTML de cobertura
npm run test:cov
# Luego abre: coverage/lcov-report/index.html
```

### Estructura de Tests

```
back/
├── src/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   └── auth.service.spec.ts  ✅ Tests
│   ├── scores/
│   │   ├── scores.service.ts
│   │   └── scores.service.spec.ts  ✅ Tests
│   └── ...
```

### Ejemplo de Test

```typescript
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, /* ... */],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should hash password correctly', async () => {
    const password = 'test123';
    const hash = await service.hashPassword(password);
    
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(await bcrypt.compare(password, hash)).toBe(true);
  });
});
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev       # Inicia server con hot-reload
npm run start:debug     # Inicia con debugger

# Producción
npm run build           # Compila TypeScript a JavaScript
npm run start:prod      # Inicia server en producción

# Testing
npm run test            # Ejecuta todos los tests
npm run test:watch      # Tests en watch mode
npm run test:cov        # Tests con cobertura

# Linting y Formateo
npm run lint            # Ejecuta ESLint
npm run format          # Formatea código con Prettier
```

---

## 📂 Estructura del Proyecto

```
back/
├── 📁 src/                          # Código fuente
│   ├── main.ts                      # Entry point
│   ├── app.module.ts                # Módulo raíz
│   │
│   ├── 📁 auth/                     # Módulo de autenticación
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts          # Lógica de auth
│   │   ├── auth.controller.ts       # Endpoints
│   │   ├── jwt.strategy.ts          # Estrategia JWT
│   │   ├── jwt-auth.guard.ts        # Guard
│   │   └── 📁 dto/
│   │       └── auth.dto.ts          # DTOs de auth
│   │
│   ├── 📁 quiz/                     # Módulo de quiz
│   │   ├── quiz.module.ts
│   │   ├── quiz.service.ts
│   │   └── quiz.controller.ts
│   │
│   ├── 📁 scores/                   # Módulo de puntajes
│   │   ├── scores.module.ts
│   │   ├── scores.service.ts        # Verificación HMAC
│   │   ├── scores.controller.ts
│   │   └── 📁 dto/
│   │       └── score.dto.ts
│   │
│   ├── 📁 leaderboard/              # Módulo de ranking
│   │   ├── leaderboard.module.ts
│   │   ├── leaderboard.service.ts
│   │   └── leaderboard.controller.ts
│   │
│   ├── 📁 chat/                     # Módulo de chatbot
│   │   ├── chat.module.ts
│   │   ├── chat.service.ts          # Integración OpenAI
│   │   ├── chat.controller.ts
│   │   └── 📁 dto/
│   │       └── chat.dto.ts
│   │
│   ├── 📁 common/                   # Servicios compartidos
│   │   └── hmac.service.ts          # Servicio HMAC
│   │
│   └── 📁 supabase/                 # Módulo Supabase
│       └── supabase.module.ts       # Provider de cliente
│
├── 📁 supabase/migrations/          # Migraciones SQL
│   └── 001_initial_schema.sql       # Schema inicial
│
├── 📁 migrations/                   # Migraciones adicionales
│   └── 004_create_game_codes.sql
│
├── 📁 test/                         # Tests E2E
│   └── app.e2e-spec.ts
│
├── package.json                     # Dependencias y scripts
├── tsconfig.json                    # Configuración TypeScript
├── nest-cli.json                    # Configuración NestJS CLI
├── jest.config.js                   # Configuración Jest
├── .env                             # Variables de entorno (gitignored)
├── .env.example                     # Ejemplo de .env
├── .eslintrc.js                     # Configuración ESLint
├── .prettierrc                      # Configuración Prettier
└── README.md                        # Este archivo
```

---

## 🚀 Despliegue

### Opción 1: Railway

1. **Crear cuenta** en [Railway](https://railway.app)

2. **Nuevo Proyecto**:
   ```bash
   railway login
   railway init
   ```

3. **Configurar variables de entorno** en Railway Dashboard

4. **Deploy**:
   ```bash
   railway up
   ```

### Opción 2: Render

1. **Conectar repo** en [Render](https://render.com)

2. **Configurar Build Command**:
   ```bash
   cd back && npm install && npm run build
   ```

3. **Configurar Start Command**:
   ```bash
   cd back && npm run start:prod
   ```

4. **Agregar variables de entorno** en Render Dashboard

### Opción 3: Heroku

```bash
# Login
heroku login

# Crear app
heroku create gender-quest-api

# Configurar variables
heroku config:set SUPABASE_URL=https://...
heroku config:set JWT_SECRET=...
# ... (todas las variables)

# Deploy
git push heroku main
```

### Opción 4: Docker

**Dockerfile**:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main"]
```

**Build y Run**:

```bash
# Build
docker build -t gender-quest-api .

# Run
docker run -p 3001:3001 --env-file .env gender-quest-api
```

---

## 🤝 Contribuir

¿Quieres mejorar el backend? Aquí tienes algunas ideas:

### Features Sugeridos

- [ ] Implementar **refresh tokens** para JWT
- [ ] Agregar **rate limiting** con `@nestjs/throttler`
- [ ] Implementar **caching** con Redis
- [ ] Agregar **Swagger/OpenAPI** documentation
- [ ] Implementar **WebSockets** para chat en tiempo real
- [ ] Agregar **logging** avanzado con Winston
- [ ] Implementar **health checks** (`/health`)
- [ ] Agregar **metrics** con Prometheus
- [ ] Implementar **feature flags**
- [ ] Agregar **audit logs**

### Cómo Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-feature`
3. Haz tus cambios
4. Agrega tests para tu feature
5. Asegúrate de que todos los tests pasen: `npm run test`
6. Commit: `git commit -m 'feat: agrega nueva feature'`
7. Push: `git push origin feature/nueva-feature`
8. Abre un Pull Request

---

## 📞 Soporte

¿Problemas o preguntas?

- 📖 [Documentación Principal](../README.md)
- 🐛 [Reportar Bug](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/issues)
- 💬 [Discusiones](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/discussions)

---

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver [LICENSE](../LICENSE) para más detalles.

---

<div align="center">

**Hecho con ❤️ por el equipo de Gender Quest**

[⬆️ Volver arriba](#-gender-quest---backend-api)

</div>

