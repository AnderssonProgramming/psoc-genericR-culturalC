import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class ChatHistoryDto {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
