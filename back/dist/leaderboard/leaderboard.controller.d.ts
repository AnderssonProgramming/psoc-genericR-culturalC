import { LeaderboardService } from './leaderboard.service';
export declare class LeaderboardController {
    private leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(limit?: string): Promise<{
        rank: number;
        username: any;
        avatarUrl: any;
        score: any;
        accuracy: string;
        submittedAt: any;
    }[]>;
    getMyRank(req: any): Promise<{
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
