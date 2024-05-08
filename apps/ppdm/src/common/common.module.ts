import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [UsersModule, AuthsModule],
})
export class CommonModule {}
