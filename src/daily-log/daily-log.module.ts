import { Module } from '@nestjs/common';
import { DailyLogService } from './daily-log.service';
import { DailyLogController } from './daily-log.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [DailyLogService],
  controllers: [DailyLogController],
})
export class DailyLogModule {}
