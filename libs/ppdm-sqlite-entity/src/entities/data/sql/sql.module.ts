import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { SqlRepository } from './sql.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([SqlRepository])],
  exports: [TypeOrmExModule],
})
export class SqlModule {}
