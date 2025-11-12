import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('questions')
  async getQuestions() {
    return this.quizService.getQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('attempts')
  async getUserAttempts(@Request() req) {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new Error('Usuario no autenticado correctamente');
    }

    return this.quizService.getUserAttempts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submitQuiz(
    @Request() req,
    @Body() body: { 
      answers: { questionId: number; answer: string }[];
      completionTimeSeconds?: number;
    },
  ) {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new Error('Usuario no autenticado correctamente');
    }

    // Verificar si el usuario aún tiene intentos disponibles
    const canPlay = await this.quizService.canUserPlayQuiz(userId);
    if (!canPlay) {
      throw new Error('Has alcanzado el límite de 3 intentos para este quiz');
    }

    const { score, details } = this.quizService.calculateScore(body.answers);
    const totalQuestions = 10;
    
    // Generar código único con tiempo de completado
    const code = await this.quizService.generateGameCode(
      userId,
      score,
      totalQuestions,
      body.completionTimeSeconds,
    );

    // Guardar INMEDIATAMENTE en el leaderboard al completar el quiz usando el código generado
    await this.quizService.saveScoreToLeaderboard(userId, score, code);

    return {
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      code,
      details,
      completionTime: body.completionTimeSeconds,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate-code')
  async validateCode(@Request() req, @Body() body: { code: string }) {
    const validation = await this.quizService.validateCode(body.code);
    
    if (!validation.valid) {
      throw new Error('Código inválido, expirado o ya utilizado');
    }

    // Marcar código como usado (legacy - mantener por compatibilidad)
    await this.quizService.markCodeAsUsed(body.code);

    // NOTA: El puntaje ya fue guardado automáticamente al completar el quiz
    // Este endpoint se mantiene solo por compatibilidad con versiones anteriores

    return {
      valid: true,
      score: validation.score,
      percentage: validation.percentage,
      message: '¡Tu puntaje ya estaba registrado!',
    };
  }
}
