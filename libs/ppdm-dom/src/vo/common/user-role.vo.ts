import { RoleType } from '@entity/ppdm-sqlite-entity/entities/common/user-role/user-role.enum';
import { PpdmBaseVo } from '../share';

export interface UserRoleVo extends PpdmBaseVo {
  name?: RoleType;
}
