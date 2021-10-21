import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permissions } from '../../core/decorator/permission.decorator';
import { UserRole } from '../../core/enums/user-role.enum';

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
  @UseGuards(AuthGuard(), AccessGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Permissions({ role: UserRole.ADMIN })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
    return await this.userService.update(id, data);
  }

  @Get(':id/possess/:resource/:resourceId')
  async possess(
    @Param('id', ParseIntPipe) id: number,
    @Param('resource') resource: string,
    @Param('resourceId', ParseIntPipe) resourceId: number,
  ) {
    return await this.userService.possess(id, resource, resourceId);
  }
}
