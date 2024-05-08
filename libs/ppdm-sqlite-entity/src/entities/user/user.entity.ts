import { Column, Entity } from 'typeorm';
import { PpdmBaseEntity } from '../../share/base-entity/ppdm-base.entity';

@Entity({ name: 'user', comment: '사용자' })
export class UserEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '사용자명',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '패스워드',
  })
  password: string;
}
