import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { DailyLogService } from './daily-log.service';

@Controller('daily-log')
export class DailyLogController {
  constructor(private readonly dailyLogService: DailyLogService) {}

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    return this.dailyLogService.create(body, token);
  }

  @Get()
  findAll(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    return this.dailyLogService.findAll(token);
  }
}
