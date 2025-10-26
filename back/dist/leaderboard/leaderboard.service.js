"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let LeaderboardService = class LeaderboardService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getTopScores(limit = 50) {
        const { data: scores, error } = await this.supabase
            .from('scores')
            .select(`
        id,
        score,
        correct_answers,
        total_questions,
        submitted_at,
        user:users(username, avatar_url)
      `)
            .eq('verified', true)
            .order('score', { ascending: false })
            .order('submitted_at', { ascending: true })
            .limit(limit);
        if (error) {
            throw new Error(`Failed to fetch leaderboard: ${error.message}`);
        }
        return scores.map((entry, index) => ({
            rank: index + 1,
            username: Array.isArray(entry.user) ? entry.user[0]?.username : entry.user?.username,
            avatarUrl: Array.isArray(entry.user) ? entry.user[0]?.avatar_url : entry.user?.avatar_url,
            score: entry.score,
            accuracy: ((entry.correct_answers / entry.total_questions) * 100).toFixed(1),
            submittedAt: entry.submitted_at,
        }));
    }
    async getUserRank(userId) {
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
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map