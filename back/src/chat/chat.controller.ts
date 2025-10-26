import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Request() req, @Body() chatMessageDto: ChatMessageDto) {
    return this.chatService.sendMessage(
      req.user.id,
      chatMessageDto.message,
      chatMessageDto.sessionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('history/:sessionId')
  async getChatHistory(@Request() req, @Param('sessionId') sessionId: string) {
    return this.chatService.getChatHistory(req.user.id, sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getUserSessions(@Request() req) {
    return this.chatService.getUserSessions(req.user.id);
  }
}
