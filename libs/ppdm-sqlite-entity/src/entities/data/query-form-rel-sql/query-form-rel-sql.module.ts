import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { QueryFormRelSqlRepository } from './query-form-rel-sql.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([QueryFormRelSqlRepository])],
  exports: [TypeOrmExModule],
})
export class QueryFormRelSqlModule {}
