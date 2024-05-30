import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { DatabaseRepository } from './database.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DatabaseRepository])],
  exports: [TypeOrmExModule],
})
export class DatabaseModule {}
