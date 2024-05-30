import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { MenuEntity } from '../menu/menu.entity';
import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type';

@Entity({ name: 'TB_MENU_ROLE', comment: '메뉴권한' })
export class MenuRoleEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '역할명',
  })
  name: RoleType;

  @ManyToOne(() => MenuEntity, (menuEntity) => menuEntity.roles)
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: Relation<MenuEntity>;
}
