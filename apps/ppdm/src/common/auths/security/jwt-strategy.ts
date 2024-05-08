import { IPayload } from '@app/ppdm-sqlite-entity/entities/auth/payload.interface';
import { UserRepository } from '@app/ppdm-sqlite-entity/entities/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import SystemUtil from 'apps/ppdm/src/share/util/system.util';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: SystemUtil.getInstance().env.jwt.secritKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IPayload, done: VerifiedCallback): Promise<any> {
    const { id } = payload;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null, user);
  }
}
