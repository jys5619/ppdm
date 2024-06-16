import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { QueryFormModule } from './query-form/query-form.module';
import { QueryFormInputModule } from './query-form-input/query-form-input.module';
import { SqlModule } from './sql/sql.module';
import { QueryFormRelSqlModule } from './query-form-rel-sql/query-form-rel-sql.module';

@Module({
  imports: [
    DatabaseModule,
    QueryFormModule,
    QueryFormInputModule,
    SqlModule,
    QueryFormRelSqlModule,
  ],
  exports: [
    DatabaseModule,
    QueryFormModule,
    QueryFormInputModule,
    SqlModule,
    QueryFormRelSqlModule,
  ],
})
export class DataModule {}
