import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitScoreDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class ScoreResponseDto {
  id: string;
  userId: string;
  username: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: Date;
  verified: boolean;
}
