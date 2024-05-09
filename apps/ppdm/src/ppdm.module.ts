import { Module } from '@nestjs/common';
import { PpdmSqliteEntityModule } from '@app/ppdm-sqlite-entity';
import { PpdmCommonModule } from '@app/ppdm-common';
import { CommonModule } from './common/common.module';
import { ShareModule } from './share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './share/config/typeorm.config';
import { APP_GUARD } from '@nestjs/core';
import PpdmAuthGuard from './common/auths/security/ppdm-auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: PpdmAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PpdmSqliteEntityModule,
    PpdmCommonModule,
    CommonModule,
    ShareModule,
  ],
})
export class PpdmModule {}
