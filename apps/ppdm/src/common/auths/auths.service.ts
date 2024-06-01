import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MenuDom, UserDom } from '@doms/ppdm-dom/dom/common';
import { SigninDto, SignupDto } from './dto';
import { JwtPayloadVo, UserInfoVo } from '@doms/ppdm-dom/vo/share';
import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { MenuVo } from '@doms/ppdm-dom/vo/common';
export interface MenuItem {
  group: string;
  id: string;
  url: string;
  name: string;
}

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userDom: UserDom,
    private readonly menuDom: MenuDom,
  ) {}

  async signup(signupDto: SignupDto) {
    const { user } = signupDto;

    if (!user.roles || user.roles.length === 0) {
      user.roles = [
        {
          name: 'USER' as RoleType,
        },
      ];
    }

    await this.userDom.create(user);
  }

  async signin(
    signinDto: SigninDto,
  ): Promise<{ access_token: string; user: UserInfoVo; menus: MenuVo[] }> {
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
    const userRoles = await findUser.roles;
    const roleTypes = userRoles.map((u) => u.name);
    console.log('FindUser', findUser, userRoles, roleTypes);

    const menuList = await this.menuDom.findMany({
      state: ActiveInactiveState.Active,
      roles: roleTypes,
    });

    const menus = menuList.map((m) => {
      return {
        id: m.id,
        name: m.name,
        url: m.url,
        parentId: m.parentId,
        sequence: m.sequence,
      };
    });

    return { access_token: jwt, user: userVo, menus: menus };
  }
}
