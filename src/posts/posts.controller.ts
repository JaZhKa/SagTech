import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from '../auth/guards/current-user.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../util';
import { userRole } from './../users/users.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: PostQueryDto) {
    return this.postsService.findOne(id, query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Me() me: { id: string; email: string },
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({ ...createPostDto, userId: me.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Me() user: any,
  ) {
    const post = await this.postsService.findOne(id);
    if (post.userId === user.id) {
      return this.postsService.update(id, updatePostDto);
    } else {
      throw new ForbiddenException(
        'You do not have permission to update this post.',
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Me() user: any) {
    const post = await this.postsService.findOne(id);
    if (post.userId === user.id || user.role === userRole.ADMIN) {
      return this.postsService.remove(id);
    } else {
      throw new ForbiddenException(
        'You do not have permission to update this post.',
      );
    }
  }
}
