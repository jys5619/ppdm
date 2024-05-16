import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import SystemUtil from 'apps/ppdm/src/share/util/system.util';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserDom } from '@doms/ppdm-dom/dom/common';
import { JwtPayloadVo, UserInfoVo } from '@doms/ppdm-dom/vo/share';

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

    const userInfo: UserInfoVo = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
    };

    return done(null, userInfo);
  }
}
