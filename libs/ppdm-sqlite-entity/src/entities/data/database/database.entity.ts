import { Column, Entity } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { DbType } from '@entity/ppdm-sqlite-entity/share/data-type';

@Entity({ name: 'TB_DATABASE', comment: 'DB정보' })
export class DatabaseEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'DB타입',
  })
  dbType: DbType;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'DB명',
  })
  dbName: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: 'DB연결문자열',
  })
  connectString: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '사용자',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '패스워드',
  })
  password: string;

  @Column({
    type: 'integer',
    comment: 'Pool최소개수',
  })
  poolMin: number;

  @Column({
    type: 'integer',
    comment: 'Pool최대개수',
  })
  poolMax: number;

  @Column({
    type: 'integer',
    comment: '최대연결시간',
  })
  timeout: number;

  @Column({
    type: 'varchar',
    length: 4000,
    comment: 'DB 정보', // USER권한 사용자에게 보여줄 정보
  })
  dbInfo: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveState;
}
