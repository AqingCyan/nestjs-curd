import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
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
  show(@Param('id', new ParseIntPipe()) id) {
    console.log('typeof id is', typeof id);
    return { title: `Post ${id}` };
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
