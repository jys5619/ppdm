import { Global, Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { UserRoleModule } from './entities/user-role/user-role.module';

@Global()
@Module({
  imports: [UserModule, UserRoleModule],
  exports: [UserModule, UserRoleModule],
})
export class PpdmSqliteEntityModule {}
