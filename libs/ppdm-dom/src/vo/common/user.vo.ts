import { PpdmBaseVo } from '../share';

export interface UserVo extends PpdmBaseVo {
  name?: string;
  email?: string;
  password?: string;
  state?: string;
}
