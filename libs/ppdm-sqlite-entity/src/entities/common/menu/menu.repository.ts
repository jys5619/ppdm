import { Repository } from 'typeorm';
import { CustomRepository } from '@entity/ppdm-sqlite-entity/share/customer-repository';
import { MenuEntity } from './menu.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type';

@CustomRepository(MenuEntity)
export class MenuRepository extends Repository<MenuEntity> {
  async findMany({
    name,
    roles,
    parentId,
    state,
  }: {
    name?: string;
    roles?: RoleType[];
    parentId?: string;
    state?: ActiveInactiveState;
  }): Promise<MenuEntity[]> {
    const qb = this.createQueryBuilder('MenuEntity').innerJoin(
      'MenuEntity.roles',
      'MenuRoleEntity',
    );

    if (name) qb.andWhere('MenuEntity.name = :name', { name });
    if (roles) qb.where('MenuRoleEntity.name IN (:roles)', { roles });
    if (parentId) qb.andWhere('MenuEntity.parent_id = :parentId', { parentId });
    if (state) qb.andWhere('MenuEntity.state = :state', { state });
    qb.orderBy({ parent_id: 'ASC', sequence: 'ASC' });
    return await qb.getMany();
  }
}
