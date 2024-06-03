import { QueryFormInputType } from '@entity/ppdm-sqlite-entity/share/data-type/query-form-input-type.enum';
import { PpdmBaseVo } from '../share';

export interface QueryFormInputVo extends PpdmBaseVo {
  name?: string;
  title?: string;
  type?: QueryFormInputType;
  values?: string;
}
