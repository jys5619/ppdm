import {
  DatabaseEntity,
  DatabaseRepository,
} from '@entity/ppdm-sqlite-entity/entities/data/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseDom {
  constructor(private readonly databaseRepository: DatabaseRepository) {}

  /**
   * ID로 사용자 정보를 조회한다.
   * @param id
   * @returns
   */
  public async findById(id: string): Promise<DatabaseEntity> {
    return await this.databaseRepository.findOne({ where: { id } });
  }
}
