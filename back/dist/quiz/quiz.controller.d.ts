import { QuizService } from './quiz.service';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizService);
    getQuestions(): Promise<{
        id: number;
        category: string;
        question: string;
        options: string[];
        feedback: string;
        intention: string;
    }[]>;
    getUserAttempts(req: any): Promise<{
        count: number;
        remaining: number;
    }>;
    submitQuiz(req: any, body: {
        answers: {
            questionId: number;
            answer: string;
        }[];
    }): Promise<{
        score: number;
        totalQuestions: number;
        percentage: number;
        code: string;
        details: any[];
    }>;
    validateCode(req: any, body: {
        code: string;
    }): Promise<{
        valid: boolean;
        score: number;
        percentage: number;
        message: string;
    }>;
}
