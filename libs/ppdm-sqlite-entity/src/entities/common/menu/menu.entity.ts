import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveType } from '@entity/ppdm-sqlite-entity/share/states';
import { MenuRoleEntity } from '../menu-role';

@Entity({ name: 'TB_MENU', comment: '메뉴' })
export class MenuEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    comment: '메뉴명',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 500,
    comment: 'URL',
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveType;

  @Column({
    type: 'integer',
    nullable: false,
    comment: '순번',
  })
  sequence: number;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '상위메뉴ID',
  })
  parentId: string;

  @ManyToOne(() => MenuEntity, (menuEntity) => menuEntity.id)
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  public menu?: Promise<MenuEntity>;

  @OneToMany(() => MenuRoleEntity, (menuRoleEntity) => menuRoleEntity.menu, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  roles: Promise<MenuRoleEntity[]>;
}
