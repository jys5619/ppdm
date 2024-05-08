import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import SystemUtil from '../util/system.util';

const systemUtil = SystemUtil.getInstance();

const devTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: systemUtil.env.db.database,
  synchronize: true,
  entities: [`${systemUtil.path.appsRoot}${systemUtil.env.db.entityPath}`],
  logging: true,
  dropSchema: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const typeOrmConfig = devTypeOrmConfig;
