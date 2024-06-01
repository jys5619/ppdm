import { BindParameters, Connection, getConnection } from 'oracledb';
import DbPool from './db-pool';
import { IDbConfig } from '.';

export function DbUtil() {
  const getDirectConn = async (dbConfig: IDbConfig): Promise<Connection> => {
    const connection = getConnection({
      user: dbConfig.username,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });

    if (!connection) {
      throw Error('Connection정보가 생성되지 않았습니다.');
    }

    return connection;
  };

  const connectTest = async (dbConfig: IDbConfig): Promise<string> => {
    let result = '연결 테스트 성공';

    const connection = await getDirectConn(dbConfig);
    try {
      const result = await connection.execute(`SELECT 1 FROM DUAL`);
      console.log('Result : ', result.rows);
    } catch (e) {
      result = e.message;
    } finally {
      await connection.close();
    }

    return result;
  };

  const getConn = async (dbConfig: IDbConfig): Promise<Connection> => {
    const dbPool = DbPool();

    const connection = await dbPool.getConn(dbConfig);

    if (!connection) {
      throw Error('Connection정보가 생성되지 않았습니다.');
    }

    return connection;
  };

  const select = async (
    dbConfig: IDbConfig,
    sql: string,
    param?: BindParameters,
  ) => {
    const connection = await getConn(dbConfig);
    const result = await connection.execute(sql, param);
    console.log('Result is:', result.rows?.length);
    await connection.close();
  };

  return {
    connectTest,
    select,
  };
}
