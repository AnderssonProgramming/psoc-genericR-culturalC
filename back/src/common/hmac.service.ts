import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HmacService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('SECRET_HMAC_KEY');
    if (!this.secretKey) {
      throw new Error('SECRET_HMAC_KEY not found in environment variables');
    }
  }

  /**
   * Genera un HMAC-SHA256 para un payload
   */
  generateHmac(payload: string): string {
    return crypto.createHmac('sha256', this.secretKey).update(payload).digest('hex');
  }

  /**
   * Verifica que un HMAC sea válido para un payload
   */
  verifyHmac(payload: string, providedHmac: string): boolean {
    const expectedHmac = this.generateHmac(payload);
    return crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(providedHmac));
  }

  /**
   * Genera un código completo: username|score|correct|total|timestamp|hmac
   */
  generateCode(username: string, score: number, correct: number, total: number): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = `${username}|${score}|${correct}|${total}|${timestamp}`;
    const hmac = this.generateHmac(payload);
    return `${payload}|${hmac}`;
  }

  /**
   * Parsea y valida un código generado por Unity
   */
  parseAndValidateCode(code: string): {
    valid: boolean;
    username?: string;
    score?: number;
    correct?: number;
    total?: number;
    timestamp?: number;
    error?: string;
  } {
    const parts = code.split('|');
    
    if (parts.length !== 6) {
      return { valid: false, error: 'Invalid code format' };
    }

    const [username, scoreStr, correctStr, totalStr, timestampStr, providedHmac] = parts;
    const payload = `${username}|${scoreStr}|${correctStr}|${totalStr}|${timestampStr}`;

    // Verificar HMAC
    if (!this.verifyHmac(payload, providedHmac)) {
      return { valid: false, error: 'Invalid HMAC signature' };
    }

    // Parsear valores
    const score = parseInt(scoreStr, 10);
    const correct = parseInt(correctStr, 10);
    const total = parseInt(totalStr, 10);
    const timestamp = parseInt(timestampStr, 10);

    // Validaciones básicas
    if (isNaN(score) || isNaN(correct) || isNaN(total) || isNaN(timestamp)) {
      return { valid: false, error: 'Invalid numeric values' };
    }

    // Verificar que no haya expirado (7 días)
    const now = Math.floor(Date.now() / 1000);
    const sevenDays = 7 * 24 * 60 * 60;
    if (now - timestamp > sevenDays) {
      return { valid: false, error: 'Code expired (max 7 days)' };
    }

    return {
      valid: true,
      username,
      score,
      correct,
      total,
      timestamp,
    };
  }
}
