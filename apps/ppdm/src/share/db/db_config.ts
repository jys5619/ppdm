export interface IDbConfig {
  dbType: string;
  dbName: string;
  connectString: string;
  username?: string;
  password?: string;
  poolName?: string;
  poolMin?: number;
  poolMax?: number;
  timeout?: number;
}
