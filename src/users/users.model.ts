import { Prisma, Role } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}