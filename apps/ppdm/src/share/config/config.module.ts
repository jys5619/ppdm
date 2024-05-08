import { Module } from '@nestjs/common';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import SystemUtil from '../util/system.util';

@Module({
  imports: [
    EnvConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        SystemUtil.getInstance().path.projectRoot +
        `/env/ppdm.${SystemUtil.getInstance().env.nodeEnv}.env`,
    }),
  ],
})
export class ConfigModule {}
