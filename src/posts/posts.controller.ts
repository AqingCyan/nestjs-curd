import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Request() request) {
    console.log(request.ip, request.hostname, request.method);
    return { title: 'posts' };
  }

  @Get(':id')
  show(@Param() params) {
    return { title: `Post ${params.id}` };
  }

  @Post()
  store(@Body() post: CreatePostDto) {
    console.log(post.title);
    return post;
  }
}
