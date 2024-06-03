import { PpdmBaseVo } from '../share';

export interface QueryFormSqlVo extends PpdmBaseVo {
  title?: string;
  description?: string;
  sql?: string;
}
