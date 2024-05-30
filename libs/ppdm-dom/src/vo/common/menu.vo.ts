import { PpdmBaseVo } from '../share';
import { MenuRoleVo } from './menu-role.vo';

export interface MenuVo extends PpdmBaseVo {
  name?: string;
  url?: string;
  parentId?: string;
  state?: string;
  sequence?: number;
  roles?: MenuRoleVo[];
}
