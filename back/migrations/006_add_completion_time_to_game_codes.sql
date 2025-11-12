-- Add completion_time to game_codes table
-- This stores the time taken to complete the quiz when the code was generated

ALTER TABLE game_codes ADD COLUMN completion_time INTEGER;

-- Add comment
COMMENT ON COLUMN game_codes.completion_time IS 'Time taken to complete the quiz in seconds when this code was generated';
