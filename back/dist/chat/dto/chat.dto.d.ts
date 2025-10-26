export declare class ChatMessageDto {
    message: string;
    sessionId?: string;
}
export declare class ChatHistoryDto {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
