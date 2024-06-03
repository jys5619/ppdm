import { Module } from '@nestjs/common';
import { DatabaseDom } from './database.dom';
import { QueryFormDom } from './query-form.dom';

@Module({
  providers: [DatabaseDom, QueryFormDom],
  exports: [DatabaseDom, QueryFormDom],
})
export class DataModule {}
