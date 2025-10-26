export declare class SubmitScoreDto {
    code: string;
}
export declare class ScoreResponseDto {
    id: string;
    userId: string;
    username: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    submittedAt: Date;
    verified: boolean;
}
