import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { QueryFormSqlRepository } from './query-form-sql.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([QueryFormSqlRepository])],
  exports: [TypeOrmExModule],
})
export class QueryFormSqlModule {}
