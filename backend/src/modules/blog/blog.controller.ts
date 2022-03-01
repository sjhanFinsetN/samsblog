import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { BlogService } from './blog.service';
import { Post as BlogPost, User } from '@prisma/client';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('blog')
export class BlogController {
  constructor(public readonly blogService: BlogService) {}

  @Post('create-post')
  @UseGuards(JwtAuthGuard)
  async createPost(
    @AuthUser() user: User,
    @Body() postDto: CreatePostDto,
  ): Promise<BlogPost> {
    console.log('create post user ', user);
    console.log('create post dto ', postDto);
    return this.blogService.createPost(user, postDto);
  }

  @Put('post/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @AuthUser() user: User,
    @Param('id') id: string,
    @Body() postDto: CreatePostDto,
  ): Promise<BlogPost> {
    return this.blogService.updatePost(user, id, postDto);
  }

  @Get('post/:id')
  async findPost(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findPost(id);
  }

  @Get('posts')
  async findPosts(): Promise<BlogPost[]> {
    return this.blogService.findPosts();
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @AuthUser() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    return this.blogService.deletePost(user, id);
  }
}
