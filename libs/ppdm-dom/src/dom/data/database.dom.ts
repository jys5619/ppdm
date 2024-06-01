import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { DatabaseVo } from '@doms/ppdm-dom/vo/data';
import {
  DatabaseEntity,
  DatabaseRepository,
} from '@entity/ppdm-sqlite-entity/entities/data/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseDom {
  constructor(private readonly databaseRepository: DatabaseRepository) {}

  /**
   * ID로 Database 정보를 조회한다.
   * @param id
   * @returns
   */
  public async get(id: string): Promise<DatabaseEntity> {
    return await this.databaseRepository.findOne({ where: { id } });
  }

  /**
   * Database정보를 저장한다.
   * @param id
   * @returns
   */
  public async create(databaseVo: DatabaseVo): Promise<DatabaseEntity> {
    const message = await this.createValidation(databaseVo);
    if (message) {
      throw new PpdmHttpException(message);
    }

    // const database = new DatabaseEntity();
    // database.dbType = databaseVo.dbType;
    // database.dbName = databaseVo.dbName;

    return await this.databaseRepository.save(databaseVo);
  }

  /**
   * Database 정보를 검증한다.
   * @param userVo
   * @returns
   */
  public async createValidation(databaseVo: DatabaseVo): Promise<string> {
    if (!databaseVo.dbType) {
      return 'DB Type을 선택하십시오.';
    }
    if (!databaseVo.dbName) {
      return 'DB명을 입력하십시오';
    }
    if (!databaseVo.connectString) {
      return 'DB연결 문자열을 입력하십시오.';
    }

    const findDatabase = await this.findOneByDbName(databaseVo.dbName);

    if (findDatabase) {
      return '이미 등록된 Database Name입니다.';
    }
  }

  /**
   * DB Name 정보를 조회한다.
   * @param email
   * @returns
   */
  public async findOneByDbName(dbName: string): Promise<DatabaseEntity> {
    return await this.databaseRepository.findOne({
      where: { dbName },
    });
  }
}
