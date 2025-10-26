import { SupabaseClient } from '@supabase/supabase-js';
export declare class LeaderboardService {
    private supabase;
    constructor(supabase: SupabaseClient);
    getTopScores(limit?: number): Promise<{
        rank: number;
        username: any;
        avatarUrl: any;
        score: any;
        accuracy: string;
        submittedAt: any;
    }[]>;
    getUserRank(userId: string): Promise<{
        rank: number;
        score: any;
        accuracy: string;
        submittedAt: any;
    }>;
    getStats(): Promise<{
        totalPlayers: number;
        totalGamesPlayed: number;
        averageScore: any;
    }>;
}
