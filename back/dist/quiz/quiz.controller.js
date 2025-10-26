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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async getQuestions() {
        return this.quizService.getQuestions();
    }
    async getUserAttempts(req) {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error('Usuario no autenticado correctamente');
        }
        return this.quizService.getUserAttempts(userId);
    }
    async submitQuiz(req, body) {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error('Usuario no autenticado correctamente');
        }
        const canPlay = await this.quizService.canUserPlayQuiz(userId);
        if (!canPlay) {
            throw new Error('Has alcanzado el límite de 3 intentos para este quiz');
        }
        const { score, details } = this.quizService.calculateScore(body.answers);
        const totalQuestions = 10;
        const code = await this.quizService.generateGameCode(userId, score, totalQuestions);
        await this.quizService.saveScoreToLeaderboard(userId, score, code);
        return {
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            code,
            details,
        };
    }
    async validateCode(req, body) {
        const validation = await this.quizService.validateCode(body.code);
        if (!validation.valid) {
            throw new Error('Código inválido, expirado o ya utilizado');
        }
        await this.quizService.markCodeAsUsed(body.code);
        return {
            valid: true,
            score: validation.score,
            percentage: validation.percentage,
            message: '¡Tu puntaje ya estaba registrado!',
        };
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Get)('questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('attempts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getUserAttempts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "submitQuiz", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('validate-code'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "validateCode", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map