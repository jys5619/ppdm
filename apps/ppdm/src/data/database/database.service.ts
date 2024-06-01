import { DatabaseDom } from '@doms/ppdm-dom/dom/data';
import { Injectable } from '@nestjs/common';
import { DbUtil, IDbConfig } from '../../share/db';
import { DatabaseEntity } from '@entity/ppdm-sqlite-entity/entities/data/database';
import { DatabaseCreateDto } from './dto/database-create.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly databaseDom: DatabaseDom) {}

  async connectionTest(databaseCreateDto: DatabaseCreateDto): Promise<string> {
    const dbUtil = DbUtil();
    let result = '';
    try {
      const dbConfig: IDbConfig = { ...databaseCreateDto };

      result = await dbUtil.connectTest(dbConfig);
    } catch (e) {
      result = e.message;
    }

    return result;
  }

  async getDatabase(id: string): Promise<DatabaseEntity> {
    return this.databaseDom.get(id);
  }

  async createDatabase(
    databaseCreateDto: DatabaseCreateDto,
  ): Promise<DatabaseEntity> {
    return this.databaseDom.create(databaseCreateDto);
  }
}
