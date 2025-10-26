# Frontend — Gender Quest (Next.js)

Este directorio contendrá la aplicación web (Next.js + TypeScript + Tailwind).

Objetivo rápido
- Páginas: `/`, `/login`, `/submit-score`, `/leaderboard`, `/chat`, `/profile/[username]`, `/sections/*`
- Integraciones: Supabase (auth + realtime + db) y OpenAI (chatbot)

Requisitos locales
- Node.js 18+ (recomendado)
- pnpm / npm / yarn

Cómo bootstrapear (PowerShell)

# Usando create-next-app (recomendado)
npx create-next-app@latest . --typescript --eslint --app

# Instalar dependencias sugeridas
npm install --save tailwindcss postcss autoprefixer @supabase/supabase-js openai framer-motion

# Iniciar dev server
npm run dev

Archivos/estructura sugerida
- `/app` (App Router)
- `/components` (UI compartida)
- `/lib/supabase.ts` (cliente Supabase)
- `/lib/openai.ts` (cliente OpenAI)
- `/styles` (Tailwind)

Variables de entorno (añadir en `.env.local`)
- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- OPENAI_API_KEY=

Siguientes pasos
1. Configurar Tailwind (https://tailwindcss.com/docs/guides/nextjs)
2. Crear `lib/supabase.ts` con `createClient`
3. Implementar página `/submit-score` para pegar el código del juego
4. Implementar API routes o usar Supabase Functions para verificar código

Notas
- La app usará Supabase Realtime para el leaderboard en tiempo real.
- Mantener Unity como app offline: los jugadores copiarán un código y lo pegarán en `/submit-score`.
