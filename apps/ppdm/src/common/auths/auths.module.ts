import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'apps/ppdm/src/common/auths/security/jwt-strategy';
import SystemUtil from '../../share/util/system.util';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: SystemUtil.getInstance().env.jwt.secritKey,
        signOptions: { expiresIn: 60 * 60 * 10 },
      }),
    }),
    PassportModule,
  ],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthsController],
  providers: [AuthsService, UsersService, JwtStrategy],
})
export class AuthsModule {}
