import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type/role-type.enum';
import { PpdmBaseVo } from '../share';

export interface MenuRoleVo extends PpdmBaseVo {
  name?: RoleType;
}
