import { Module } from '@nestjs/common';
import { DatabaseDom } from './database.dom';
import { QueryFormDom } from './query-form.dom';
import { QueryFormSqlDom } from './query-form-sql.dom';

@Module({
  providers: [DatabaseDom, QueryFormDom, QueryFormSqlDom],
  exports: [DatabaseDom, QueryFormDom, QueryFormSqlDom],
})
export class DataModule {}
