import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { SubmitScoreDto } from './dto/score.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async submitScore(@Request() req, @Body() submitScoreDto: SubmitScoreDto) {
    return this.scoresService.submitScore(req.user.id, submitScoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-scores')
  async getMyScores(@Request() req) {
    return this.scoresService.getUserScores(req.user.id);
  }
}
