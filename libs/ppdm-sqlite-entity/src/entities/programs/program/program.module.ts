import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { ProgramRepository } from './program.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProgramRepository])],
  exports: [TypeOrmExModule],
})
export class ProgramModule {}
