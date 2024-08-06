import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { usersService } from './users.service';
import { Users } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: usersService) {}

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<Users> {
    return this.usersService.getUser(id);
  }

  @Post()
  async createUser(@Body() data: Users): Promise<Users> {
    return this.usersService.createUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: Users): Promise<Users> {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<Users> {
    return this.usersService.deleteUser(id);
  }
}
