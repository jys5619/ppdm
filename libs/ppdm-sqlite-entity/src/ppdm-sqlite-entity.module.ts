import { Global, Module } from '@nestjs/common';
import { EntityModule } from './entities/entity.module';

@Global()
@Module({
  imports: [EntityModule],
  exports: [EntityModule],
})
export class PpdmSqliteEntityModule {}
