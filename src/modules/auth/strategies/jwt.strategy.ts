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
      secretOrKey: 'wRSNfNrRHEefdN84U7LdTkpg6SwZxjFW',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload', payload);
    const { name } = payload;
    const entity = await this.userService.findByName(name);

    if (!entity) {
      done(new UnauthorizedException('没没找用户'));
    }

    done(null, entity);
  }
}
