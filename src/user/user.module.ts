import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600 },
})

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
