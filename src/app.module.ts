import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { DailyLogModule } from './daily-log/daily-log.module';
import { DailyConsumptionModule } from './daily-consumption/daily-consumption.module';
import {Controller,Get} from '@nestjs/common';

@Controller()
export class AppController{
  @Get()
  getRoot(){
    return{message: 'API Fitness App está online!' };
  }
}

@Module({
  imports: [
    PrismaModule,
    UserModule,
    DailyLogModule,
    DailyConsumptionModule,
  ],
})
export class AppModule {}
