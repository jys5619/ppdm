import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { QueryFormModule } from './query-form/query-form.module';
import { QueryFormInputModule } from './query-form-input/query-form-input.module';
import { QueryFormSqlModule } from './query-form-sql/query-form-sql.module';

@Module({
  imports: [
    DatabaseModule,
    QueryFormModule,
    QueryFormInputModule,
    QueryFormSqlModule,
  ],
  exports: [
    DatabaseModule,
    QueryFormModule,
    QueryFormInputModule,
    QueryFormSqlModule,
  ],
})
export class DataModule {}
