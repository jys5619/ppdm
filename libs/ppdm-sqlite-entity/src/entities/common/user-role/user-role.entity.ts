import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type';

@Entity({ name: 'TB_USER_ROLE', comment: '사용자권한' })
export class UserRoleEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '역할명',
  })
  name: RoleType;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.roles)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Relation<UserEntity>;
}
