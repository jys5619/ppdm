import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PpdmPublicAuth } from '../../share/decorator';
@Controller('users')
@ApiTags('Users Controller')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('test')
  @PpdmPublicAuth()
  find1() {
    return '안녕하세요.';
  }
}
