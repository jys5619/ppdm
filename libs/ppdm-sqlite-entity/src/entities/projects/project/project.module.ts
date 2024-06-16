import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProjectRepository])],
  exports: [TypeOrmExModule],
})
export class ProjectModule {}
