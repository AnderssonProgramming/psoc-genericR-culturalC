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
exports.ScoresService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
const hmac_service_1 = require("../common/hmac.service");
let ScoresService = class ScoresService {
    constructor(supabase, hmacService) {
        this.supabase = supabase;
        this.hmacService = hmacService;
    }
    async submitScore(userId, submitScoreDto) {
        const { code } = submitScoreDto;
        const validation = this.hmacService.parseAndValidateCode(code);
        if (!validation.valid) {
            throw new common_1.BadRequestException(validation.error);
        }
        const { username, score, correct, total, timestamp } = validation;
        const { data: existingScore } = await this.supabase
            .from('scores')
            .select('id')
            .eq('submission_code', code)
            .single();
        if (existingScore) {
            throw new common_1.ConflictException('This code has already been submitted');
        }
        const { data: user } = await this.supabase
            .from('users')
            .select('username')
            .eq('id', userId)
            .single();
        if (!user || user.username !== username) {
            throw new common_1.BadRequestException('Username in code does not match logged in user');
        }
        const { data: newScore, error } = await this.supabase
            .from('scores')
            .insert({
            user_id: userId,
            score,
            correct_answers: correct,
            total_questions: total,
            submission_code: code,
            verified: true,
            submitted_at: new Date(timestamp * 1000).toISOString(),
        })
            .select()
            .single();
        if (error) {
            throw new Error(`Failed to save score: ${error.message}`);
        }
        return {
            id: newScore.id,
            userId: newScore.user_id,
            username,
            score: newScore.score,
            correctAnswers: newScore.correct_answers,
            totalQuestions: newScore.total_questions,
            submittedAt: newScore.submitted_at,
            verified: newScore.verified,
        };
    }
    async getUserScores(userId) {
        const { data: scores, error } = await this.supabase
            .from('scores')
            .select('*')
            .eq('user_id', userId)
            .order('submitted_at', { ascending: false });
        if (error) {
            throw new Error(`Failed to fetch scores: ${error.message}`);
        }
        return scores.map((score) => ({
            id: score.id,
            score: score.score,
            correctAnswers: score.correct_answers,
            totalQuestions: score.total_questions,
            submittedAt: score.submitted_at,
            verified: score.verified,
        }));
    }
};
exports.ScoresService = ScoresService;
exports.ScoresService = ScoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        hmac_service_1.HmacService])
], ScoresService);
//# sourceMappingURL=scores.service.js.map