import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [CommonModule, DataModule],
  exports: [CommonModule, DataModule],
})
export class DomModule {}
