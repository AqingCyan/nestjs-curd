import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '0Qb98Vh70wfvieE5DcYqAwbfhYcZRKDy',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const { name } = payload;
    const entity = await this.userService.findByName(name);
    if (!entity) {
      done(new UnauthorizedException('没找到该用户'));
    }
    done(null, entity);
  }
}
