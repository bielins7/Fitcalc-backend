import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { DailyConsumptionService } from './daily-consumption.service';

@Controller('daily-consumption')
export class DailyConsumptionController {
  constructor(private readonly dailyConsumptionService: DailyConsumptionService) {}

  @Post()
  create(@Body() createDailyConsumptionDto: any, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.dailyConsumptionService.create(createDailyConsumptionDto, token);
  }

  @Get()
  findAll(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.dailyConsumptionService.findAll(token);
  }
}
