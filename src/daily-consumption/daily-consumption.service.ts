import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DailyConsumptionService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createDto: any, token: string) {
    const decoded: any = this.jwtService.decode(token);
    const userId = decoded?.id;
    return this.prisma.dailyConsumption.create({
      data: {
        calorias: createDto.calorias,
        treinoMin: createDto.treinoMin,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(token: string) {
    const decoded: any = this.jwtService.decode(token);
    const userId = decoded?.id;
    return this.prisma.dailyConsumption.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }});
  }
}
