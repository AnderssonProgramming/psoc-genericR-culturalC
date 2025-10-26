import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

@Injectable()
export class LeaderboardService {
  constructor(@Inject(SUPABASE_CLIENT) private supabase: SupabaseClient) {}

  async getTopScores(limit: number = 50) {
    const { data: scores, error } = await this.supabase
      .from('scores')
      .select(
        `
        id,
        score,
        correct_answers,
        total_questions,
        submitted_at,
        user:users(username, avatar_url)
      `,
      )
      .eq('verified', true)
      .order('score', { ascending: false })
      .order('submitted_at', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch leaderboard: ${error.message}`);
    }

    return scores.map((entry: any, index: number) => ({
      rank: index + 1,
      username: Array.isArray(entry.user) ? entry.user[0]?.username : entry.user?.username,
      avatarUrl: Array.isArray(entry.user) ? entry.user[0]?.avatar_url : entry.user?.avatar_url,
      score: entry.score,
      accuracy: ((entry.correct_answers / entry.total_questions) * 100).toFixed(1),
      submittedAt: entry.submitted_at,
    }));
  }

  async getUserRank(userId: string) {
    // Get user's best score
    const { data: userScore } = await this.supabase
      .from('scores')
      .select('score, correct_answers, total_questions, submitted_at')
      .eq('user_id', userId)
      .eq('verified', true)
      .order('score', { ascending: false })
      .limit(1)
      .single();

    if (!userScore) {
      return null;
    }

    // Count how many users have higher scores
    const { count } = await this.supabase
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('verified', true)
      .gt('score', userScore.score);

    return {
      rank: (count || 0) + 1,
      score: userScore.score,
      accuracy: ((userScore.correct_answers / userScore.total_questions) * 100).toFixed(1),
      submittedAt: userScore.submitted_at,
    };
  }

  async getStats() {
    const { count: totalPlayers } = await this.supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: totalScores } = await this.supabase
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('verified', true);

    const { data: avgScore } = await this.supabase.rpc('get_average_score');

    return {
      totalPlayers: totalPlayers || 0,
      totalGamesPlayed: totalScores || 0,
      averageScore: avgScore || 0,
    };
  }
}
