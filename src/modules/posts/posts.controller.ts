import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('posts')
@UseGuards(DemoAuthGuard)
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
  @Roles('member')
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
