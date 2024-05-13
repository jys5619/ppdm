import { Module } from '@nestjs/common';
import { UserRoleRepository } from './user-role.repository';
import { TypeOrmExModule } from '@app/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRoleRepository])],
  exports: [TypeOrmExModule],
})
export class UserRoleModule {}
