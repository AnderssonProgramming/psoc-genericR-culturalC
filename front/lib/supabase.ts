import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
};

export type Score = {
  id: string;
  user_id: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  submission_code: string;
  verified: boolean;
  submitted_at: string;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  avatarUrl?: string;
  score: number;
  accuracy: string;
  submittedAt: string;
};
