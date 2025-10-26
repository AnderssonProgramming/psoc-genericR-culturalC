-- Tabla para almacenar códigos generados por el juego
CREATE TABLE IF NOT EXISTS game_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(8) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_game_codes_code ON game_codes(code);
CREATE INDEX IF NOT EXISTS idx_game_codes_user_id ON game_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_game_codes_used ON game_codes(used);

-- Comentarios
COMMENT ON TABLE game_codes IS 'Códigos únicos generados al completar el quiz del juego';
COMMENT ON COLUMN game_codes.code IS 'Código único de 8 caracteres generado al finalizar el juego';
COMMENT ON COLUMN game_codes.expires_at IS 'Fecha de expiración del código (1 hora desde su creación)';
COMMENT ON COLUMN game_codes.used IS 'Indica si el código ya fue usado para registrar un puntaje';
