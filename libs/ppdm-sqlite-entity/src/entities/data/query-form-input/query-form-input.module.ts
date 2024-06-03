import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { QueryFormInputRepository } from './query-form-input.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([QueryFormInputRepository])],
  exports: [TypeOrmExModule],
})
export class QueryFormInputModule {}
