import { PpdmBaseVo } from '../share';
import { UserRoleVo } from './user-role.vo';

export interface UserVo extends PpdmBaseVo {
  name?: string;
  email?: string;
  password?: string;
  state?: string;
  roles?: UserRoleVo[];
}
