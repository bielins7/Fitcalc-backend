import { Module } from '@nestjs/common';
import { DailyConsumptionService } from './daily-consumption.service';
import { DailyConsumptionController } from './daily-consumption.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [DailyConsumptionController],
  providers: [DailyConsumptionService],
})
export class DailyConsumptionModule {}
