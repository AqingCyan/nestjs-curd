import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: '0Qb98Vh70wfvieE5DcYqAwbfhYcZRKDy',
      signOptions: {
        expiresIn: '12h',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ], // 要使用别的模块的内容，需要在这里导入
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
