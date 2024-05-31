import { DatabaseDom } from '@doms/ppdm-dom/dom/data';
import { Injectable } from '@nestjs/common';
import { DbUtil, IDbConfig } from '../../share/db';
import { DatabaseCreateDto } from './dto/database-create.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly databaseDom: DatabaseDom) {}

  async connectionTest(databaseCreateDto: DatabaseCreateDto): Promise<string> {
    const dbUtil = DbUtil();
    let result = '';
    try {
      const dbConfig: IDbConfig = {
        dbType: databaseCreateDto.dbType,
        dbName: databaseCreateDto.dbName,
        connectString: databaseCreateDto.connectString,
        username: databaseCreateDto.username,
        password: databaseCreateDto.password,
        poolName: databaseCreateDto.poolName,
        poolMin: databaseCreateDto.poolMin,
        poolMax: databaseCreateDto.poolMax,
        timeout: databaseCreateDto.timeout,
      };
      console.log('DBConfig', dbConfig);
      result = await dbUtil.connectTest(dbConfig);
    } catch (e) {
      result = e.message;
    }

    return result;
  }
}
