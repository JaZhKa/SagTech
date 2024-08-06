import { PrismaService } from './../prisma.service';
import { Users } from './users.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class usersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: number): Promise<Users | null> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async createUser(data: Users): Promise<Users> {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: Users): Promise<Users> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });
  }

  async deleteUser(id: number): Promise<Users> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}