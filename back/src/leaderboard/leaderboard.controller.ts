import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 50;
    return this.leaderboardService.getTopScores(parsedLimit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-rank')
  async getMyRank(@Request() req) {
    return this.leaderboardService.getUserRank(req.user.id);
  }

  @Get('stats')
  async getStats() {
    return this.leaderboardService.getStats();
  }
}
