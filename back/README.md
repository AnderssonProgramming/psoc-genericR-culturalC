# Backend — Gender Quest (Supabase + API)

Este directorio contiene los artefactos y documentación del backend. La arquitectura propuesta usa Supabase (Postgres + Realtime) y endpoints (Next.js API routes o un pequeño Express) para verificar códigos generados por Unity y servir el leaderboard.

Esquema de base de datos (sugerido)

users
- id (uuid)
- username (text, unique)
- email (text, unique)
- password_hash (text)
- avatar_url (text)
- created_at (timestamp)

scores
- id (uuid)
- user_id (uuid)
- score (int)
- correct_answers (int)
- total_questions (int)
- submission_code (text, unique)
- verified (boolean)
- submitted_at (timestamp)

chat_sessions
- id (uuid)
- user_id (uuid)
- messages (jsonb)
- started_at (timestamp)

analytics_events
- id (uuid)
- event_type (text)
- metadata (jsonb)
- timestamp (timestamp)

Endpoints sugeridos

POST /api/auth/register  → crear cuenta (o usar Supabase Auth)
POST /api/auth/login     → login
POST /api/scores         → verificar y guardar código del juego (verificación de hash)
GET  /api/leaderboard    → top 50
POST /api/chat           → pasar mensaje a OpenAI y guardar en chat_sessions

Verificación del código (algoritmo)
1. Unity genera un string: `username|score|correct|total|timestamp|hash`
2. El backend split por `|`, toma payload y recalcula HMAC(hash) con una clave secreta (p.ej. `HMAC-SHA256(secret, payload)`)
3. Comparar hashes. Validar que `timestamp` no tenga más de 7 días.
4. Verificar uniqueness del `submission_code` en la tabla `scores`.
5. Si todo ok → insertar registro y marcar `verified=true`.

Variables de entorno (poner en `back/.env`)
- SUPABASE_URL=
- SUPABASE_SERVICE_ROLE_KEY=    # si usa server-side para operaciones privilegiadas
- SECRET_HMAC_KEY=              # clave para verificar los códigos generados por Unity
- OPENAI_API_KEY=

Cómo empezar (local)
- Crear proyecto en Supabase y ejecutar migrations (o crear tablas manualmente)
- Rellenar `back/.env` con las variables
- Implementar `POST /api/scores` que realice la verificación HMAC y guarde en DB

Siguientes pasos prácticos
- Implementar tests unitarios para la verificación HMAC
- Preparar script para crear la vista materializada `leaderboard`
- Integrar Supabase Realtime para notificar cambios en `scores`

