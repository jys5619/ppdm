import { DatabaseDom } from '@doms/ppdm-dom/dom/data';
import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '@entity/ppdm-sqlite-entity/entities/data/database';
import { DatabaseCreateDto } from './dto/database-create.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly databaseDom: DatabaseDom) {}

  async connectionTest(
    databaseCreateDto: DatabaseCreateDto,
  ): Promise<{ state: string; message: string }> {
    return await this.databaseDom.connectTest(databaseCreateDto);
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
