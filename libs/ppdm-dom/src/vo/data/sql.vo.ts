import { PpdmBaseVo } from '../share';

export interface SqlVo extends PpdmBaseVo {
  title?: string;
  description?: string;
  sql?: string;
}
