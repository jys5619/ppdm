import { PpdmSqliteEntityModule } from '@entity/ppdm-sqlite-entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [PpdmSqliteEntityModule],
})
export class PpdmAdminModule {}
