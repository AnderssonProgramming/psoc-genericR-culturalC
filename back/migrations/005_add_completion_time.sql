-- Add completion_time_seconds to scores table for ranking tiebreaker
-- Users who complete the quiz faster with the same score rank higher
-- Run this migration only once

ALTER TABLE scores ADD COLUMN completion_time_seconds INTEGER;

-- Create index for better query performance on leaderboard
CREATE INDEX idx_scores_completion_time ON scores(completion_time_seconds);

-- Add comment to explain the column
COMMENT ON COLUMN scores.completion_time_seconds IS 'Time taken to complete the quiz in seconds. Used as tiebreaker when scores are equal. Lower is better.';
