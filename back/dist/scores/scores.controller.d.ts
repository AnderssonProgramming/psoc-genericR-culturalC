import { ScoresService } from './scores.service';
import { SubmitScoreDto } from './dto/score.dto';
export declare class ScoresController {
    private scoresService;
    constructor(scoresService: ScoresService);
    submitScore(req: any, submitScoreDto: SubmitScoreDto): Promise<{
        id: any;
        userId: any;
        username: string;
        score: any;
        correctAnswers: any;
        totalQuestions: any;
        submittedAt: any;
        verified: any;
    }>;
    getMyScores(req: any): Promise<{
        id: any;
        score: any;
        correctAnswers: any;
        totalQuestions: any;
        submittedAt: any;
        verified: any;
    }[]>;
}
