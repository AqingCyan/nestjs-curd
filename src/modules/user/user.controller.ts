import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, data);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.liked(id);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
    return await this.userService.update(id, data);
  }
}
