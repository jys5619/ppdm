import { Connection, createPool, getConnection, getPool } from 'oracledb';
import { IDbConfig } from '.';

export default function DbPool() {
  const getConn = async (
    dbConfig: IDbConfig,
  ): Promise<Connection | undefined> => {
    if (dbConfig.dbType === 'ORACLE') {
      if (!dbConfig.poolName) {
        throw Error('pool name은 필수입력입니다.');
      }

      let connection = undefined;
      try {
        connection = await getConnection(dbConfig.poolName);
      } catch (e) {}

      if (!connection) {
        await createPool({
          user: dbConfig.username,
          password: dbConfig.password,
          connectString: dbConfig.connectString,
          poolMin: dbConfig.poolMin, // 1,
          poolMax: dbConfig.poolMax, //10,
          poolTimeout: dbConfig.timeout, //300,
          poolAlias: dbConfig.poolName,
        });
        connection = await getConnection(dbConfig.poolName);
      }

      return connection;
    }
  };

  const getDirectConn = async (
    dbConfig: IDbConfig,
  ): Promise<Connection | undefined> => {
    return await getConnection({
      user: dbConfig.username,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });
  };

  const closePool = async () => {
    getPool().close();
  };

  return {
    getConn,
    getDirectConn,
    closePool,
  };
}
