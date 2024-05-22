import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDom } from '@doms/ppdm-dom/dom/common';
import { SigninDto, SignupDto } from './dto';
import { JwtPayloadVo, UserInfoVo } from '@doms/ppdm-dom/vo/share';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userDom: UserDom,
  ) {}

  async signup(signupDto: SignupDto) {
    const { user, roles } = signupDto;
    await this.userDom.create(user, roles);
  }

  async signin(
    signinDto: SigninDto,
  ): Promise<{ access_token: string; user: UserInfoVo }> {
    const { email, password } = signinDto;
    const findUser = await this.userDom.findOneByEmail(email);

    if (!findUser) {
      throw new UnauthorizedException();
    }

    const isMatch = await this.userDom.isMatchPassword(
      findUser.password,
      password,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const roles = await findUser.roles;
    const payload: JwtPayloadVo = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      roles: roles.map((r) => r.name),
    };

    const userVo: UserInfoVo = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      roles: roles.map((r) => r.name),
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { access_token: jwt, user: userVo };
  }
}
