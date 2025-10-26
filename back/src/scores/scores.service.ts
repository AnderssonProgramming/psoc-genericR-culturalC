import { Injectable, BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { HmacService } from '../common/hmac.service';
import { SubmitScoreDto } from './dto/score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
    private hmacService: HmacService,
  ) {}

  async submitScore(userId: string, submitScoreDto: SubmitScoreDto) {
    const { code } = submitScoreDto;

    // Parse and validate code
    const validation = this.hmacService.parseAndValidateCode(code);
    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    const { username, score, correct, total, timestamp } = validation;

    // Check if code already used
    const { data: existingScore } = await this.supabase
      .from('scores')
      .select('id')
      .eq('submission_code', code)
      .single();

    if (existingScore) {
      throw new ConflictException('This code has already been submitted');
    }

    // Verify username matches user
    const { data: user } = await this.supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();

    if (!user || user.username !== username) {
      throw new BadRequestException('Username in code does not match logged in user');
    }

    // Insert score
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

  async getUserScores(userId: string) {
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
}
