import { Module } from '@nestjs/common';
import { QueryFormController } from './query-form.controller';
import { QueryFormService } from './query-form.service';

@Module({
  controllers: [QueryFormController],
  providers: [QueryFormService],
})
export class QueryFormModule {}
