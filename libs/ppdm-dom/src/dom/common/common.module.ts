import { Module } from '@nestjs/common';
import { UserDom } from './user.dom';

@Module({
  providers: [UserDom],
  exports: [UserDom],
})
export class CommonModule {}
