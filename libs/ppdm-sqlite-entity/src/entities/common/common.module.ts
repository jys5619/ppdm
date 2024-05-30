import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { MenuModule } from './menu/menu.module';
import { MenuRoleModule } from './menu-role/menu-role.module';

@Module({
  imports: [UserModule, UserRoleModule, MenuModule, MenuRoleModule],
  exports: [UserModule, UserRoleModule, MenuModule, MenuRoleModule],
})
export class CommonModule {}
