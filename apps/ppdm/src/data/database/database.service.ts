import { DatabaseDom } from '@doms/ppdm-dom/dom/data';
import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '@entity/ppdm-sqlite-entity/entities/data/database';
import { DatabaseCreateDto } from './dto/database-create.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly databaseDom: DatabaseDom) {}

  async connectionTest(databaseCreateDto: DatabaseCreateDto): Promise<string> {
    let result = '';
    try {
      result = await this.databaseDom.connectTest(databaseCreateDto);
    } catch (e) {
      result = e.message;
    }

    return result;
  }

  async getList(): Promise<DatabaseEntity[]> {
    return await this.databaseDom.getList();
  }

  async get(id: string): Promise<DatabaseEntity> {
    return await this.databaseDom.get(id);
  }

  async create(databaseCreateDto: DatabaseCreateDto): Promise<DatabaseEntity> {
    return await this.databaseDom.create(databaseCreateDto);
  }
}
