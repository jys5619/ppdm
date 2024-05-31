import { BindParameters, Connection } from 'oracledb';
import DbPool from './db-pool';
import { IDbConfig } from '.';

export function DbUtil() {
  const getDirectConnection = async (
    dbconfig: IDbConfig,
  ): Promise<Connection> => {
    const dbPool = DbPool();

    const connection = await dbPool.getConn(dbconfig);

    if (!connection) {
      throw Error('Connection정보가 생성되지 않았습니다.');
    }

    return connection;
  };

  const connectTest = async (dbconfig: IDbConfig): Promise<string> => {
    let result = '연결 테스트 성공';

    const connection = await getDirectConnection(dbconfig);

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

  const getConnection = async (dbconfig: IDbConfig): Promise<Connection> => {
    const dbPool = DbPool();

    const connection = await dbPool.getConn(dbconfig);

    if (!connection) {
      throw Error('Connection정보가 생성되지 않았습니다.');
    }

    return connection;
  };

  const select = async (
    dbconfig: IDbConfig,
    sql: string,
    param?: BindParameters,
  ) => {
    const connection = await getConnection(dbconfig);
    const result = await connection.execute(sql, param);
    console.log('Result is:', result.rows?.length);
    await connection.close();
  };

  return {
    connectTest,
    select,
  };
}
