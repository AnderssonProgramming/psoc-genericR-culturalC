import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendMessage(req: any, chatMessageDto: ChatMessageDto): Promise<{
        sessionId: any;
        message: string;
        timestamp: string;
    }>;
    getChatHistory(req: any, sessionId: string): Promise<any>;
    getUserSessions(req: any): Promise<{
        id: any;
        startedAt: any;
        messageCount: any;
        lastMessage: any;
    }[]>;
}
