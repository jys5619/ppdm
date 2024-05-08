import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '@app/ppdm-sqlite-entity/entities/user/dto/create-user.dto';
import { SigninDto } from '@app/ppdm-sqlite-entity/entities/auth/singin.dto';
import * as bcrypt from 'bcrypt';
import { IPayload } from '@app/ppdm-sqlite-entity/entities/auth/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async singupValidation(
    createUserDto: CreateUserDto,
  ): Promise<string> {
    if (createUserDto.name) {
      return '사용자명을 입력하십시오.';
    }
    if (createUserDto.email) {
      return '이메일을 입력하십시오.';
    }
    if (createUserDto.password) {
      return '패스워드를 입력하십시오.';
    }

    const findUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (findUser) {
      return '이미 등록된 이메일입니다.';
    }
  }

  async signup(createUserDto: CreateUserDto) {
    const message = await this.singupValidation(createUserDto);
    if (!message) {
      throw new PpdmHttpException(message);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.usersService.create(createUserDto);
  }

  async signin(signinDto: SigninDto): Promise<{ access_token: string }> {
    const findUser = await this.usersService.findOneByEmail(signinDto.email);

    const isMatch = await bcrypt.compare(
      signinDto.password,
      findUser?.password || '',
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: IPayload = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      roles: [],
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { access_token: jwt };
  }
}
