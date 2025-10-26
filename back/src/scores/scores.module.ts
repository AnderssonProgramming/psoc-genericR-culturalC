import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { HmacService } from '../common/hmac.service';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService, HmacService],
  exports: [ScoresService],
})
export class ScoresModule {}
