import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { QueryFormRepository } from './query-form.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([QueryFormRepository])],
  exports: [TypeOrmExModule],
})
export class QueryFormModule {}
