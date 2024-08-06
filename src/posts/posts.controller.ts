import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from '../auth/guards/current-user.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../util';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Me() me: { id: string; email: string },
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create({ ...createPostDto, userId: me.id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
