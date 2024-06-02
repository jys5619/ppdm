import { DbType } from '@entity/ppdm-sqlite-entity/share/data-type';
import { PpdmBaseVo } from '../share';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';

export interface DatabaseVo extends PpdmBaseVo {
  dbType: DbType;
  dbName: string;
  connectString: string;
  username?: string;
  password?: string;
  poolMin?: number;
  poolMax?: number;
  timeout?: number;
  dbInfo?: string;
  state?: ActiveInactiveState;
}
