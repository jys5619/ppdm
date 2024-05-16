import { Global, Module } from '@nestjs/common';
import { PpdmDomService } from './ppdm-dom.service';
import { DomModule } from './dom/dom.module';
import { PpdmCommonModule } from '@app/ppdm-common';
import { PpdmSqliteEntityModule } from '@entity/ppdm-sqlite-entity';

@Global()
@Module({
  imports: [PpdmSqliteEntityModule, PpdmCommonModule, DomModule],
  exports: [
    PpdmSqliteEntityModule,
    PpdmCommonModule,
    PpdmDomService,
    DomModule,
  ],
  providers: [PpdmDomService],
})
export class PpdmDomModule {}
