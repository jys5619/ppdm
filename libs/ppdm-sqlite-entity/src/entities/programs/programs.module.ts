import { Module } from '@nestjs/common';
import { ProgramModule } from './program/program.module';
import { ProgramFlowModule } from './program-flow/program-flow.module';
import { ProgramMenuModule } from './program-menu/program-menu.module';

@Module({
  imports: [ProgramModule, ProgramMenuModule, ProgramFlowModule],
  exports: [ProgramModule, ProgramMenuModule, ProgramFlowModule],
})
export class ProgramsModule {}
