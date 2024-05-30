import { Column, Entity } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveType } from '@entity/ppdm-sqlite-entity/share/states';
import { DbType } from '@entity/ppdm-sqlite-entity/share/data-type';

@Entity({ name: 'TB_DATABASE', comment: 'DB정보' })
export class DatabaseEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    comment: '사용자명',
  })
  dbType: DbType;

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
  state: ActiveInactiveType;
}
