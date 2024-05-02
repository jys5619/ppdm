import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PpdmSqliteEntityModule } from '@app/ppdm-sqlite-entity';

@Module({
  imports: [PpdmSqliteEntityModule, UsersModule],
})
export class AppModule {}
