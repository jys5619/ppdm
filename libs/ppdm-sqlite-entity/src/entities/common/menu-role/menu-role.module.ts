import { Module } from '@nestjs/common';
import { MenuRoleRepository } from './menu-role.repository';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([MenuRoleRepository])],
  exports: [TypeOrmExModule],
})
export class MenuRoleModule {}
