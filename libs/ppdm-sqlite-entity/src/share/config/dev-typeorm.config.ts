import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const devTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'dev/ppdm.db',
  synchronize: true,
  entities: [__dirname + '/../../entities/**/*.entity{.ts,.js}'], //
  logging: true,
  dropSchema: true,
};
