import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [UserModule, UserRoleModule],
  exports: [UserModule, UserRoleModule],
})
export class CommonModule {}
