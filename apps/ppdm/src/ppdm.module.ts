import { Module } from '@nestjs/common';
import { PpdmSqliteEntityModule } from '@entity/ppdm-sqlite-entity';
import { PpdmCommonModule } from '@app/ppdm-common';
import { CommonModule } from './common/common.module';
import { ShareModule } from './share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './share/config/typeorm.config';
import { APP_GUARD } from '@nestjs/core';
import PpdmAuthGuard from './common/auths/security/ppdm-auth.guard';
import { PpdmDomModule } from '@doms/ppdm-dom/ppdm-dom.module';
import { PpdmRolesGuard } from './common/auths/security/ppdm-role.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: PpdmAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PpdmRolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PpdmSqliteEntityModule,
    PpdmDomModule,
    PpdmCommonModule,
    CommonModule,
    ShareModule,
  ],
})
export class PpdmModule {}
