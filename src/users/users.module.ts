import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [usersService, PrismaService],
})
export class UsersModule {}