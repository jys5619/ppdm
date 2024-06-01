import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleEntity } from '../user-role/user-role.entity';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';

@Entity({ name: 'TB_USER', comment: '사용자' })
export class UserEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    comment: '사용자명',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
    unique: true,
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: '패스워드',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveState;

  @OneToMany(() => UserRoleEntity, (userRoleEntity) => userRoleEntity.user, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  roles: Promise<UserRoleEntity[]>;
}
