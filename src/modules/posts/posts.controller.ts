import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param() params) {
    return { title: `Post ${params.id}` };
  }

  @Post()
  store(@Body() post: CreatePostDto) {
    throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    this.demoService.create(post);
  }
}