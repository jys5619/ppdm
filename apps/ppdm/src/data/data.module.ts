import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { QueryFormModule } from './query-form/query-form.module';

@Module({
  imports: [DatabaseModule, QueryFormModule],
})
export class DataModule {}
