import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) throw new BadRequestException('Usuário já cadastrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'Usuário registrado com sucesso', id: user.id };
  }
  
async login(loginUserDto: LoginUserDto) {
  const { email, password } = loginUserDto;

  // 👇 ADICIONAMOS ESTE LOG
  const user = await this.prisma.user.findUnique({ where: { email } });
  console.log("USER FOUND:", user);

  if (!user) throw new UnauthorizedException('Usuário ou senha inválidos');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new UnauthorizedException('Usuário ou senha inválidos');

  const access_token = this.jwtService.sign({ sub: user.id, email: user.email });
  return { access_token };
}
}

