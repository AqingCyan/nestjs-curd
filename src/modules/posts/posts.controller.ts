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
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../../core/interceptors/errors.interceptor';
import { User } from '../../core/decorators/user.decorator';
import { DemoPipe } from '../../core/pipes/demo.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ErrorsInterceptor)
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
  @UseGuards(DemoAuthGuard)
  @Roles('member')
  store(@Body() post: CreatePostDto, @User('demo', new DemoPipe()) user) {
    console.log(user);
    this.demoService.create(post);
  }
}
