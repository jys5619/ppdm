import { Body, Controller, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { SigninDto } from 'apps/ppdm/src/common/auths/dto/singin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PpdmPublicAuth } from '../../share/decorator/ppdm-public-auth';
import { SignupDto } from './dto';

@ApiTags('Auth Controller')
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @ApiOperation({ summary: '사용자를 등록한다.' })
  @PpdmPublicAuth()
  @Post('signup')
  async singup(@Body() signupDto: SignupDto) {
    return await this.authsService.signup(signupDto);
  }

  @ApiOperation({ summary: '로그인 처리를 한다.' })
  @PpdmPublicAuth()
  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.authsService.signin(signinDto);
  }
}
