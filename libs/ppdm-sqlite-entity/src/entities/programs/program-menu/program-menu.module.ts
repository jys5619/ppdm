import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { ProgramMenuRepository } from './program-menu.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProgramMenuRepository])],
  exports: [TypeOrmExModule],
})
export class ProgramMenuModule {}
