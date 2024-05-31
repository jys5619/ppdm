import { Module } from '@nestjs/common';
import { DatabaseDom } from './database.dom';

@Module({
  providers: [DatabaseDom],
  exports: [DatabaseDom],
})
export class DataModule {}
