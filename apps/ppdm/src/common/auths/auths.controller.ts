import { Body, Controller, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from '@app/ppdm-sqlite-entity/entities/user/dto/create-user.dto';
import { SigninDto } from '@app/ppdm-sqlite-entity/entities/auth/singin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Controller')
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @ApiOperation({ summary: '사용자를 등록한다.' })
  @Post('signup')
  async singup(@Body() createUserDto: CreateUserDto) {
    return await this.authsService.signup(createUserDto);
  }

  @ApiOperation({ summary: '로그인 처리를 한다.' })
  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.authsService.signin(signinDto);
  }
}
