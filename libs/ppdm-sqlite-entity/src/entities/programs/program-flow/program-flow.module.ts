import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { ProgramFlowRepository } from './program-flow.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProgramFlowRepository])],
  exports: [TypeOrmExModule],
})
export class ProgramFlowModule {}
