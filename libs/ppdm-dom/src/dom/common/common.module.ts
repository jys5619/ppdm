import { Module } from '@nestjs/common';
import { UserDom } from './user.dom';
import { MenuDom } from './menu.dom';

@Module({
  providers: [UserDom, MenuDom],
  exports: [UserDom, MenuDom],
})
export class CommonModule {}
