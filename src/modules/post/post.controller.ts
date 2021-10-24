import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorator/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { ListOptions } from '../../core/decorator/list-options.decorator';
import { Permissions } from '../../core/decorator/permission.decorator';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';
import { TransformResponseInterceptor } from '../../core/interceptors/transform-response.interceptor';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Resource } from 'src/core/enums/resource.enum';
import { Possession } from '../../core/enums/possession.enum';
import { UserRole } from '../../core/enums/user-role.enum';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async store(@Body() data: PostDto, @User() user: UserEntity) {
    return await this.postService.store(data, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(TransformResponseInterceptor)
  async index(
    @ListOptions({ limit: 10, sort: 'updated', order: 'DESC' })
    options: ListOptionsInterface,
  ) {
    return await this.postService.index(options);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.postService.show(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AccessGuard)
  @Permissions({
    resource: Resource.POST,
    possession: Possession.OWN,
    role: UserRole.VIP,
  })
  async update(@Param('id') id: string, @Body() data: Partial<PostDto>) {
    return await this.postService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return await this.postService.destroy(id);
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard())
  async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return await this.postService.vote(id, user);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard())
  async unVote(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.unVote(id, user);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.liked(id);
  }
}
