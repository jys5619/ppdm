import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [AuthsModule, UsersModule],
})
export class CommonModule {}
