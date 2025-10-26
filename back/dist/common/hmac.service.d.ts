import { ConfigService } from '@nestjs/config';
export declare class HmacService {
    private configService;
    private readonly secretKey;
    constructor(configService: ConfigService);
    generateHmac(payload: string): string;
    verifyHmac(payload: string, providedHmac: string): boolean;
    generateCode(username: string, score: number, correct: number, total: number): string;
    parseAndValidateCode(code: string): {
        valid: boolean;
        username?: string;
        score?: number;
        correct?: number;
        total?: number;
        timestamp?: number;
        error?: string;
    };
}
