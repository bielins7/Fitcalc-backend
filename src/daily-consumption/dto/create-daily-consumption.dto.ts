import { IsNumber } from 'class-validator';

export class CreateDailyConsumptionDto {
  @IsNumber()
  calorias: number;

  @IsNumber()
  treinoMin: number;
}
