import { Module } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([MenuRepository])],
  exports: [TypeOrmExModule],
})
export class MenuModule {}
