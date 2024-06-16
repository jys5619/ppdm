import { Module } from '@nestjs/common';
import { DatabaseDom } from './database.dom';
import { QueryFormDom } from './query-form.dom';
import { SqlDom } from './sql.dom';

@Module({
  providers: [DatabaseDom, QueryFormDom, SqlDom],
  exports: [DatabaseDom, QueryFormDom, SqlDom],
})
export class DataModule {}
