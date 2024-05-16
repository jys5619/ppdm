import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from '@entity/ppdm-sqlite-entity/share/customer-repository/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  exports: [TypeOrmExModule],
})
export class UserModule {}
