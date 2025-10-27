<div align="center">

# 🌐 Gender Quest - Frontend

### Aplicación Web Interactiva con Next.js + React + Three.js

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=three.js)](https://threejs.org/)

*Experiencia educativa inmersiva sobre roles de género*

[📖 Documentación Principal](../README.md) | [🔧 Backend API](../back/README.md) | [🎮 Demo](#)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Páginas y Rutas](#-páginas-y-rutas)
- [Componentes Principales](#️-componentes-principales)
- [State Management](#-state-management)
- [Estilos y Diseño](#-estilos-y-diseño)
- [Integración con Backend](#-integración-con-backend)
- [Despliegue](#-despliegue)
- [Optimización](#-optimización)

---

## 🎯 Descripción

El **frontend de Gender Quest** es una aplicación web moderna construida con **Next.js 16** (App Router) que ofrece:

- 🎮 **Juego 3D Interactivo** con Three.js
- 🤖 **Chatbot AI Flotante** disponible en todas las páginas
- 📚 **8 Secciones Educativas** con contenido multimedia
- 🏆 **Leaderboard en Tiempo Real** con Supabase Realtime
- 🔐 **Autenticación Segura** con contexto React
- 📱 **Diseño Responsive** para móvil, tablet y desktop
- ✨ **Animaciones Fluidas** con Framer Motion

### Objetivos

✅ **Experiencia de usuario excepcional**  
✅ **Diseño moderno y atractivo**  
✅ **Performance optimizado** (Core Web Vitals)  
✅ **Accesibilidad** (WCAG 2.1)  
✅ **SEO optimizado**  
✅ **Progressive Web App** (PWA ready)

---

## ✨ Características

### 🎮 Juego Interactivo 3D

- **Three.js Scene**: Entorno 3D inmersivo
- **30 Preguntas**: Quiz educativo sobre mujeres destacadas
- **Pantallas Dinámicas**:
  - 👋 Welcome Screen con animaciones
  - 🎯 Quiz Card con temporizador
  - 🎉 Results Screen con estadísticas
- **Efectos Visuales**: Partículas, lighting, animaciones
- **Responsive**: Adaptado a diferentes tamaños de pantalla

### 🤖 Chatbot AI

- **Ollama (LLM Local)**: Respuestas inteligentes y contextuales
- **Interfaz Flotante**: Botón siempre visible
- **Historial**: Mantiene contexto de conversación
- **Smooth Animations**: Transiciones fluidas
- **Markdown Support**: Formato rico en respuestas
- **Fallback a Hugging Face**: Si Ollama no está disponible

### 📊 Leaderboard

- **Tiempo Real**: Actualización automática con Supabase
- **Top 50 Jugadores**: Ranking global
- **Estadísticas**: Score, respuestas correctas, fecha
- **Perfiles**: Avatar y username de jugadores
- **Animaciones**: Entrada suave de elementos

### 🔐 Autenticación

- **Context API**: Estado global de usuario
- **Protected Routes**: Middleware para rutas privadas
- **Forms con Validación**: React Hook Form + Zod
- **UI Atractiva**: Formularios modernos con animaciones
- **Error Handling**: Mensajes claros para el usuario

### 📚 Contenido Educativo

- **8 Secciones Temáticas**: Documental dividido
- **Cards Interactivas**: Hover effects y animaciones
- **Navegación Intuitiva**: Grid responsive
- **Contenido Rico**: Texto, imágenes, videos

---

## 🚀 Tecnologías

### Core Framework

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.0 | React framework con App Router |
| **React** | 19.2 | Librería UI |
| **TypeScript** | 5.3 | Tipado estático |

### UI y Estilos

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **Tailwind CSS** | 3.4 | Framework de estilos utility-first |
| **PostCSS** | 8.4 | Transformación de CSS |
| **Autoprefixer** | 10.4 | Vendor prefixes automáticos |
| **clsx** | 2.1 | Condicionales de clases CSS |
| **tailwind-merge** | 2.2 | Merge de clases Tailwind |
| **class-variance-authority** | 0.7 | Variantes de componentes |

### Animaciones

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **Framer Motion** | 11.0 | Animaciones y transiciones |

### 3D Graphics

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **Three.js** | 0.180 | Motor de gráficos 3D WebGL |
| **@react-three/fiber** | 9.4 | React renderer para Three.js |
| **@react-three/drei** | 10.7 | Helpers para R3F |

### Formularios y Validación

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **React Hook Form** | 7.50 | Gestión de formularios |
| **Zod** | 3.22 | Validación de esquemas |
| **@hookform/resolvers** | 3.3 | Integración RHF + Zod |

### State Management

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **Zustand** | 4.5 | Estado global ligero (opcional) |

### Integraciones

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@supabase/supabase-js** | 2.39 | Cliente Supabase |
| **openai** | 4.20 | Cliente OpenAI para chatbot (legacy, no usado) |

**Nota**: El chatbot usa Ollama (LLM local) que corre en el backend. No se requiere `openai` npm package.

### UI Components

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **Lucide React** | 0.330 | Iconos modernos |

---

## 📦 Instalación

### 1️⃣ Prerrequisitos

Asegúrate de tener:

- ✅ **Node.js 18+** instalado
- ✅ **npm** o **pnpm**
- ✅ **Backend** corriendo en `http://localhost:3001`
- ✅ **Proyecto Supabase** configurado

### 2️⃣ Instalar Dependencias

```bash
# Navega al directorio frontend
cd front

# Instala dependencias
npm install

# O con pnpm (más rápido)
pnpm install
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en `front/`:

```bash
# Copia el ejemplo (si existe)
cp .env.local.example .env.local
```

Edita `front/.env.local`:

```env
# ==========================================
# API BACKEND URL
# ==========================================
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# ==========================================
# SUPABASE CONFIGURATION
# ==========================================
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ==========================================
# OPTIONAL: FEATURES FLAGS
# ==========================================
# NEXT_PUBLIC_ENABLE_ANALYTICS=true
# NEXT_PUBLIC_ENABLE_PWA=true
```

### 🔑 Dónde Obtener las Claves

| Variable | Fuente |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | URL de tu backend (local o producción) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → `anon` `public` |

**⚠️ Importante**: Variables con prefijo `NEXT_PUBLIC_` son expuestas al cliente.

---

## 🚀 Iniciar Desarrollo

```bash
# Asegúrate de estar en front/
cd front

# Inicia el servidor de desarrollo
npm run dev

# La app estará en: http://localhost:3000
```

### Hot Reload

El servidor de desarrollo tiene **hot reload** automático:
- ✅ Cambios en componentes se reflejan inmediatamente
- ✅ Cambios en estilos actualizan sin refresh
- ✅ Errores se muestran en el navegador

---

## 📂 Estructura del Proyecto

```
front/
├── 📁 app/                          # App Router (Next.js 13+)
│   ├── layout.tsx                   # Layout global
│   ├── page.tsx                     # 🏠 Landing page
│   ├── globals.css                  # Estilos globales Tailwind
│   │
│   ├── 📁 login/                    # 🔐 Página de login
│   │   └── page.tsx
│   │
│   ├── 📁 register/                 # ✍️ Página de registro
│   │   └── page.tsx
│   │
│   ├── 📁 game/                     # 🎮 Juego interactivo
│   │   ├── page.tsx                 # Entry point con dynamic import
│   │   ├── QuizGameClient.tsx       # Cliente principal del juego
│   │   ├── QuizGameClient_NEW.tsx   # Versión nueva (experimental)
│   │   ├── QuizGameClient_OLD.tsx   # Versión antigua (backup)
│   │   ├── QuizGameSimple.tsx       # Versión simple sin 3D
│   │   ├── ThreeScene.tsx           # Escena 3D con Three.js
│   │   ├── WelcomeScreen.tsx        # Pantalla de bienvenida
│   │   ├── QuizCard.tsx             # Tarjeta de pregunta
│   │   └── ResultsScreen.tsx        # Pantalla de resultados
│   │
│   ├── 📁 leaderboard/              # 🏆 Ranking global
│   │   └── page.tsx
│   │
│   ├── 📁 chat/                     # 💬 Página de chat
│   │   └── page.tsx
│   │
│   └── 📁 sections/                 # 📚 Secciones educativas
│       └── page.tsx
│
├── 📁 components/                   # Componentes reutilizables
│   ├── NavBar.tsx                   # Barra de navegación
│   └── FloatingChatbot.tsx          # Chatbot flotante global
│
├── 📁 lib/                          # Utilidades y configuración
│   ├── api.ts                       # Cliente API (fetch/axios)
│   ├── supabase.ts                  # Cliente Supabase
│   ├── auth-context.tsx             # Context de autenticación
│   ├── theme.ts                     # Configuración de tema
│   └── utils.ts                     # Helpers generales
│
├── 📁 public/                       # Archivos estáticos
│   ├── images/                      # Imágenes
│   ├── icons/                       # Iconos
│   └── favicon.ico                  # Favicon
│
├── package.json                     # Dependencias y scripts
├── next.config.js                   # Configuración Next.js
├── tsconfig.json                    # Configuración TypeScript
├── tailwind.config.ts               # Configuración Tailwind
├── postcss.config.js                # Configuración PostCSS
├── .eslintrc.json                   # Configuración ESLint
├── .env.local                       # Variables de entorno (gitignored)
├── .env.local.example               # Ejemplo de .env.local
└── README.md                        # Este archivo
```

---

## 🗺️ Páginas y Rutas

| Ruta | Componente | Descripción | Auth |
|------|-----------|-------------|------|
| `/` | `app/page.tsx` | 🏠 Landing page con hero y features | No |
| `/login` | `app/login/page.tsx` | 🔐 Inicio de sesión | No |
| `/register` | `app/register/page.tsx` | ✍️ Registro de usuario | No |
| `/game` | `app/game/page.tsx` | 🎮 Juego 3D interactivo | Sí |
| `/leaderboard` | `app/leaderboard/page.tsx` | 🏆 Ranking global | No |
| `/chat` | `app/chat/page.tsx` | 💬 Chat con AI | Sí |
| `/sections` | `app/sections/page.tsx` | 📚 Secciones educativas | No |

### Rutas Protegidas

Las rutas que requieren autenticación (`/game`, `/chat`) verifican el token JWT:

```typescript
// Middleware de autenticación
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
}, []);
```

---

## 🧩 Componentes Principales

### NavBar (`components/NavBar.tsx`)

**Responsabilidad**: Barra de navegación global

**Features**:
- ✅ Logo y nombre del proyecto
- ✅ Links de navegación
- ✅ Estado de autenticación (login/logout)
- ✅ Menú responsive para móvil
- ✅ Animaciones con Framer Motion

**Uso**:

```tsx
import NavBar from '@/components/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
```

---

### FloatingChatbot (`components/FloatingChatbot.tsx`)

**Responsabilidad**: Chatbot AI disponible globalmente

**Features**:
- ✅ Botón flotante siempre visible
- ✅ Modal de chat con animación
- ✅ Integración con backend `/api/chat` (Ollama)
- ✅ Historial de conversación
- ✅ Indicador de "escribiendo..."
- ✅ Markdown rendering en respuestas

**Estado**:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

---

### ThreeScene (`app/game/ThreeScene.tsx`)

**Responsabilidad**: Escena 3D con Three.js

**Features**:
- ✅ Canvas 3D con `@react-three/fiber`
- ✅ Iluminación dinámica
- ✅ Partículas animadas
- ✅ Camera controls
- ✅ Responsive al tamaño de ventana

**Uso**:

```tsx
import ThreeScene from './ThreeScene';

export default function GamePage() {
  return (
    <div className="relative h-screen">
      <ThreeScene />
      <QuizCard />
    </div>
  );
}
```

---

### QuizGameClient (`app/game/QuizGameClient.tsx`)

**Responsabilidad**: Lógica principal del juego

**Estados**:

```typescript
const [gameState, setGameState] = useState<'welcome' | 'playing' | 'results'>('welcome');
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [answers, setAnswers] = useState<Answer[]>([]);
```

**Flujo**:

1. **Welcome Screen** → Usuario hace click en "Jugar"
2. **Playing** → Muestra preguntas una por una
3. **Results Screen** → Muestra puntaje final y genera código HMAC

---

## 🎨 State Management

### Auth Context (`lib/auth-context.tsx`)

Gestiona el estado de autenticación global:

```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ... lógica de auth

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Uso**:

```typescript
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido {user?.username}</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

---

## 🎨 Estilos y Diseño

### Tailwind CSS

**Configuración** (`tailwind.config.ts`):

```typescript
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
```

### Estilos Globales (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800;
    @apply text-white min-h-screen;
  }
}

@layer components {
  .btn-primary {
    @apply bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition;
  }
}
```

### Framer Motion

**Ejemplos de animaciones**:

```tsx
import { motion } from 'framer-motion';

export default function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg p-6 shadow-lg"
    >
      Contenido
    </motion.div>
  );
}
```

---

## 🔌 Integración con Backend

### API Client (`lib/api.ts`)

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  // Auth
  register: async (data: RegisterData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Scores
  submitScore: async (code: string, token: string) => {
    const res = await fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ submission_code: code }),
    });
    return res.json();
  },

  // Leaderboard
  getLeaderboard: async () => {
    const res = await fetch(`${API_URL}/leaderboard`);
    return res.json();
  },

  // Chat
  sendMessage: async (message: string, token: string) => {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    return res.json();
  },
};
```

---

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

Vercel es la plataforma creada por el equipo de Next.js.

**1. Instalar Vercel CLI**:

```bash
npm install -g vercel
```

**2. Deploy**:

```bash
cd front
vercel
```

**3. Configurar Variables de Entorno** en Vercel Dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**4. Deploy a Producción**:

```bash
vercel --prod
```

---

### Opción 2: Netlify

**1. Build Command**:

```bash
cd front && npm run build
```

**2. Publish Directory**:

```
front/.next
```

**3. Variables de Entorno**: Agregar en Netlify Dashboard

---

### Opción 3: Docker

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
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

**Build y Run**:

```bash
docker build -t gender-quest-front .
docker run -p 3000:3000 --env-file .env.local gender-quest-front
```

---

## ⚡ Optimización

### Performance

**Next.js Image Optimization**:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

**Dynamic Imports** (Code Splitting):

```tsx
import dynamic from 'next/dynamic';

const QuizGameClient = dynamic(() => import('./QuizGameClient'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
```

**Font Optimization**:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### SEO

**Metadata en cada página**:

```tsx
export const metadata: Metadata = {
  title: 'Juego - Gender Quest',
  description: 'Juega y aprende sobre roles de género',
  openGraph: {
    title: 'Gender Quest - Juego Educativo',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

### Core Web Vitals

- ✅ **LCP** (Largest Contentful Paint) < 2.5s
- ✅ **FID** (First Input Delay) < 100ms
- ✅ **CLS** (Cumulative Layout Shift) < 0.1

**Mejoras**:
- Usar `next/image` para imágenes
- Precargar recursos críticos
- Code splitting con dynamic imports
- Lazy loading de componentes pesados

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo

# Producción
npm run build         # Compila la aplicación
npm run start         # Inicia servidor de producción

# Linting y Formateo
npm run lint          # Ejecuta ESLint
```

---

## 🤝 Contribuir

### Ideas para Contribuir

- [ ] Agregar **tests** con Jest y React Testing Library
- [ ] Implementar **PWA** (Service Worker, manifest)
- [ ] Agregar **modo oscuro** completo
- [ ] Implementar **i18n** (multi-idioma)
- [ ] Mejorar **accesibilidad** (ARIA labels, keyboard navigation)
- [ ] Agregar **animaciones** más complejas
- [ ] Optimizar **bundle size**
- [ ] Implementar **offline mode**
- [ ] Agregar **notificaciones push**

### Flujo de Contribución

1. Fork el repo
2. Crea una rama: `git checkout -b feature/nueva-ui`
3. Haz tus cambios
4. Commit: `git commit -m 'feat: mejora UI del juego'`
5. Push: `git push origin feature/nueva-ui`
6. Abre un Pull Request

---

## 📞 Soporte

- 📖 [Documentación Principal](../README.md)
- 🔧 [Backend API Docs](../back/README.md)
- 🐛 [Reportar Bug](https://github.com/AnderssonProgramming/psoc-genericR-culturalC/issues)

---

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver [LICENSE](../LICENSE) para más detalles.

---

<div align="center">

**Hecho con ❤️ y ☕ por el equipo de Gender Quest**

[⬆️ Volver arriba](#-gender-quest---frontend)

</div>
