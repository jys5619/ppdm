import { Global, Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class PpdmSqliteEntityModule {}
