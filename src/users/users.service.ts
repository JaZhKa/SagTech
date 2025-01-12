import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private prismaService: PrismaService) {}

  getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const result = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    this.logger.log(`User has been created : ${JSON.stringify(result)}`);
    return result;
  }

  findAll(query: Prisma.UserInclude) {
    return this.prismaService.user.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
    this.logger.warn(`User has been updated : ${JSON.stringify(result)}`);
    return result;
  }

  async remove(id: string) {
    const result = await this.prismaService.user.delete({ where: { id } });
    this.logger.warn(`User has been deleted : ${JSON.stringify(result)}`);
    return result;
  }

  async getUserRole(id: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { role: true },
    });
    return { roles: [user.role] };
  }
}
