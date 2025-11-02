import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: '🎮 Gender Quest Backend is running!',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/api/auth',
        quiz: '/api/quiz',
        scores: '/api/scores',
        leaderboard: '/api/leaderboard',
        chat: '/api/chat',
      },
    };
  }

  @Get('health')
  getHealthCheck() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
