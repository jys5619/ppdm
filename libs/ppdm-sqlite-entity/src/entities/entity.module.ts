import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DataModule } from './data/data.module';
import { ProjectsModule } from './projects/projects.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [ProjectsModule, ProgramsModule, CommonModule, DataModule],
  exports: [ProjectsModule, ProgramsModule, CommonModule, DataModule],
})
export class EntityModule {}
