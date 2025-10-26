import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class ChatService {
    private readonly supabase;
    private readonly configService;
    private readonly huggingFaceApiKey;
    private readonly useLocalModel;
    private readonly ollamaBaseUrl;
    private readonly ollamaModel;
    private readonly systemContext;
    constructor(supabase: SupabaseClient, configService: ConfigService);
    private callHuggingFace;
    private callOllama;
    private formatPrompt;
    private formatPromptForPhi;
    private getDemoResponse;
    sendMessage(userId: string, message: string, sessionId?: string): Promise<{
        sessionId: any;
        message: string;
        timestamp: string;
    }>;
    getChatHistory(userId: string, sessionId: string): Promise<any>;
    getUserSessions(userId: string): Promise<{
        id: any;
        startedAt: any;
        messageCount: any;
        lastMessage: any;
    }[]>;
}
