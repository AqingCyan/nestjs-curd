import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  /**
   * 测试登录jwt验证
   */
  @Get('test')
  @UseGuards(AuthGuard())
  async authTest(@User() user) {
    console.log('user:', user);
    return {
      message: 'ok',
    };
  }
}
