import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { PpdmBaseVo } from '../share';
import { QueryFormInputVo } from './query-form-input.vo';
import { QueryFormSqlVo } from './query-form-sql.vo';

export interface QueryFormVo extends PpdmBaseVo {
  title?: string;
  favorites?: string;
  description?: string;
  inputList?: QueryFormInputVo[];
  sqlList?: QueryFormSqlVo[];
  state?: ActiveInactiveState;
  createdAt?: Date;
  updatedAt?: Date;
}
