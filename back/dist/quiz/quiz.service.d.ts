import { SupabaseClient } from '@supabase/supabase-js';
export declare class QuizService {
    private readonly supabase;
    private readonly questions;
    constructor(supabase: SupabaseClient);
    getQuestions(): Promise<{
        id: number;
        category: string;
        question: string;
        options: string[];
        feedback: string;
        intention: string;
    }[]>;
    generateGameCode(userId: string, score: number, totalQuestions: number): Promise<string>;
    validateCode(code: string): Promise<{
        valid: boolean;
        score?: number;
        percentage?: number;
        userId?: string;
    }>;
    markCodeAsUsed(code: string): Promise<void>;
    saveScoreToLeaderboard(userId: string, score: number, submissionCode: string): Promise<void>;
    getUserAttempts(userId: string): Promise<{
        count: number;
        remaining: number;
    }>;
    canUserPlayQuiz(userId: string): Promise<boolean>;
    calculateScore(answers: {
        questionId: number;
        answer: string;
    }[]): {
        score: number;
        details: any[];
    };
}
