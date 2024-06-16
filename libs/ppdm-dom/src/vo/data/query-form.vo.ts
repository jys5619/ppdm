import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { PpdmBaseVo } from '../share';
import { QueryFormInputVo } from './query-form-input.vo';
import { SqlVo } from './sql.vo';

export interface QueryFormVo extends PpdmBaseVo {
  title?: string;
  favorites?: string;
  description?: string;
  inputList?: QueryFormInputVo[];
  sqlList?: SqlVo[];
  state?: ActiveInactiveState;
  createdAt?: Date;
  updatedAt?: Date;
}
