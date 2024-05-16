import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDom } from '@doms/ppdm-dom/dom/common';
import { JwtPayloadVo } from '@doms/ppdm-dom/vo/common';
import { SigninDto, SignupDto } from './dto';

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

  async signin(signinDto: SigninDto): Promise<{ access_token: string }> {
    const findUser = await this.userDom.findOneByEmail(signinDto.email);

    const isMatch = await this.userDom.isMatchPassword(
      findUser.password,
      signinDto.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadVo = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      roles: [],
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { access_token: jwt };
  }
}
