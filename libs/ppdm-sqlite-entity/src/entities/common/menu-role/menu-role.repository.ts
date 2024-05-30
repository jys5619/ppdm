import { Repository } from 'typeorm';
import { MenuRoleEntity } from './menu-role.entity';
import { CustomRepository } from '@entity/ppdm-sqlite-entity/share/customer-repository';

@CustomRepository(MenuRoleEntity)
export class MenuRoleRepository extends Repository<MenuRoleEntity> {}
