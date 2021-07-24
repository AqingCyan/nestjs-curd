import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule], // 要使用别的模块的内容，需要在这里导入
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
