import { Global, Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { devTypeOrmConfig } from './share/config/dev-typeorm.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(devTypeOrmConfig), UserModule],
  exports: [UserModule],
})
export class PpdmSqliteEntityModule {
  constructor() {
    console.log(__dirname + '../**/**/*.entity{.ts,.js}');
  }
}
