import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { DatabaseVo } from '@doms/ppdm-dom/vo/data';
import {
  DatabaseEntity,
  DatabaseRepository,
} from '@entity/ppdm-sqlite-entity/entities/data/database';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { Injectable } from '@nestjs/common';
import {
  BindParameters,
  Connection,
  createPool,
  getConnection,
} from 'oracledb';

@Injectable()
export class DatabaseDom {
  constructor(private readonly databaseRepository: DatabaseRepository) {}

  /**
   * ID로 Database 정보를 조회한다.
   * @param id
   * @returns
   */
  public async getList(
    state: ActiveInactiveState = ActiveInactiveState.Active,
  ): Promise<DatabaseEntity[]> {
    return await this.databaseRepository.find({
      where: { state },
    });
  }

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

  private async getDirectConnection(
    databaseVo: DatabaseVo,
  ): Promise<Connection> {
    const connection = getConnection({
      user: databaseVo.username,
      password: databaseVo.password,
      connectString: databaseVo.connectString,
      connectTimeout: databaseVo.timeout || 300,
    });

    if (!connection) {
      throw Error('Connection정보가 생성되지 않았습니다.');
    }

    return connection;
  }

  private async getPoolConnection(databaseVo: DatabaseVo): Promise<Connection> {
    const key = `P${databaseVo.id}`;

    if (databaseVo.dbType === 'ORACLE') {
      let connection = undefined;
      try {
        connection = await getConnection(key);
      } catch (e) {}

      if (!connection) {
        await createPool({
          user: databaseVo.username,
          password: databaseVo.password,
          connectString: databaseVo.connectString,
          poolMin: databaseVo.poolMin, // 1,
          poolMax: databaseVo.poolMax, //10,
          poolTimeout: databaseVo.timeout || 300,
          poolAlias: key,
        });
        connection = await getConnection(key);
      }

      return connection;
    }
  }

  private async getConn(databaseVo: DatabaseVo): Promise<Connection> {
    if (databaseVo.poolMin && databaseVo.poolMax) {
      return await this.getPoolConnection(databaseVo);
    } else {
      return await this.getDirectConnection(databaseVo);
    }
  }

  public async connectTest(databaseVo: DatabaseVo): Promise<string> {
    let result = '연결 테스트 성공';

    const connection = await this.getDirectConnection(databaseVo);
    try {
      await connection.execute(`SELECT 1 FROM DUAL`);
    } catch (e) {
      result = e.message;
    } finally {
      await connection.close();
    }

    return result;
  }

  public async executeQuery(id: string, sql: string, param?: BindParameters) {
    const database = await this.databaseRepository.findOne({ where: { id } });
    const databaseVo: DatabaseVo = { ...database };
    const connection = await this.getConn(databaseVo);

    const selectData = await connection.execute(sql, param);
    await connection.close();

    const result = { id: '', metaData: [], rows: [] };

    if (selectData) {
      for (const meta of selectData.metaData) {
        result.metaData.push({ name: meta.name, dbType: meta.dbTypeName });
      }
      for (const row of selectData.rows) {
        const item: { [x: string]: string | number | null | undefined } = {};
        for (let i = 0; i < result.metaData.length; i++) {
          item[result.metaData[i].name] = row[i];
        }
        result.rows.push(item);
      }
    }
    return result;
  }
}
