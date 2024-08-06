import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/query.dto';
import { isEmpty } from '../util';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from './../decorator/roles.decorator';
import { userRole } from './users.interface';
import { Me } from './../auth/guards/current-user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.ADMIN, userRole.USER)
  findOne(@Param('id') id: string, @Me() user: any) {
    if (user.id === id || user.role === userRole.ADMIN) {
      return this.usersService.findOne(id);
    }
    throw new ForbiddenException(
      'You do not have permission to access this resource.',
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.ADMIN, userRole.USER)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Me() user: any,
  ) {
    if (user.id === id || user.role === userRole.ADMIN) {
      return this.usersService.update(id, updateUserDto);
    }
    throw new ForbiddenException(
      'You do not have permission to access this resource.',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.ADMIN, userRole.USER)
  remove(@Param('id') id: string, @Me() user: any) {
    if (user.id === id || user.role === userRole.ADMIN) {
      return this.usersService.remove(id);
    }
    throw new ForbiddenException(
      'You do not have permission to access this resource.',
    );
  }
}
