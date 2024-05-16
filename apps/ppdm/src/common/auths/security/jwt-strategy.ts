import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import SystemUtil from 'apps/ppdm/src/share/util/system.util';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserDom } from '@doms/ppdm-dom/dom/common';
import { JwtPayloadVo } from '@doms/ppdm-dom/vo/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userDom: UserDom) {
    super({
      secretOrKey: SystemUtil.getInstance().env.jwt.secritKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadVo, done: VerifiedCallback): Promise<any> {
    const { id } = payload;
    const user = await this.userDom.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null, user);
  }
}
