"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HmacService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let HmacService = class HmacService {
    constructor(configService) {
        this.configService = configService;
        this.secretKey = this.configService.get('SECRET_HMAC_KEY');
        if (!this.secretKey) {
            throw new Error('SECRET_HMAC_KEY not found in environment variables');
        }
    }
    generateHmac(payload) {
        return crypto.createHmac('sha256', this.secretKey).update(payload).digest('hex');
    }
    verifyHmac(payload, providedHmac) {
        const expectedHmac = this.generateHmac(payload);
        return crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(providedHmac));
    }
    generateCode(username, score, correct, total) {
        const timestamp = Math.floor(Date.now() / 1000);
        const payload = `${username}|${score}|${correct}|${total}|${timestamp}`;
        const hmac = this.generateHmac(payload);
        return `${payload}|${hmac}`;
    }
    parseAndValidateCode(code) {
        const parts = code.split('|');
        if (parts.length !== 6) {
            return { valid: false, error: 'Invalid code format' };
        }
        const [username, scoreStr, correctStr, totalStr, timestampStr, providedHmac] = parts;
        const payload = `${username}|${scoreStr}|${correctStr}|${totalStr}|${timestampStr}`;
        if (!this.verifyHmac(payload, providedHmac)) {
            return { valid: false, error: 'Invalid HMAC signature' };
        }
        const score = parseInt(scoreStr, 10);
        const correct = parseInt(correctStr, 10);
        const total = parseInt(totalStr, 10);
        const timestamp = parseInt(timestampStr, 10);
        if (isNaN(score) || isNaN(correct) || isNaN(total) || isNaN(timestamp)) {
            return { valid: false, error: 'Invalid numeric values' };
        }
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
};
exports.HmacService = HmacService;
exports.HmacService = HmacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HmacService);
//# sourceMappingURL=hmac.service.js.map