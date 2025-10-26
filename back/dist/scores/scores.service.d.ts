import { SupabaseClient } from '@supabase/supabase-js';
import { HmacService } from '../common/hmac.service';
import { SubmitScoreDto } from './dto/score.dto';
export declare class ScoresService {
    private supabase;
    private hmacService;
    constructor(supabase: SupabaseClient, hmacService: HmacService);
    submitScore(userId: string, submitScoreDto: SubmitScoreDto): Promise<{
        id: any;
        userId: any;
        username: string;
        score: any;
        correctAnswers: any;
        totalQuestions: any;
        submittedAt: any;
        verified: any;
    }>;
    getUserScores(userId: string): Promise<{
        id: any;
        score: any;
        correctAnswers: any;
        totalQuestions: any;
        submittedAt: any;
        verified: any;
    }[]>;
}
