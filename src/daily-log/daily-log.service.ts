import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DailyLogService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(data: any, token: string) {
    const decoded: any = this.jwtService.decode(token);
    const userId = decoded?.id;
    return this.prisma.dailyLog.create({
      data: {
        weight: data.weight ?? null,
        height: data.height ?? null,
        imc: data.imc ?? null,
        tmb: data.tmb ?? null,
        mensagem: data.mensagem ?? null,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(token: string) {
    const decoded: any = this.jwtService.decode(token);
    const userId = decoded?.id;
    return this.prisma.dailyLog.findMany({ where: { userId }, orderBy: { date: 'desc' } });
  }
}
