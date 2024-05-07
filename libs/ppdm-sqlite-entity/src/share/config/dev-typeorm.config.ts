import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const devTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'dev/ppdm.db',
  synchronize: true,
  entities: [__dirname + '/../../entities/**/*.entity{.ts,.js}'], //
  logging: true,
  dropSchema: true,
  namingStrategy: new SnakeNamingStrategy(),
};
