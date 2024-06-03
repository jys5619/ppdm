import { Column, Entity, OneToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { QueryFormInputEntity } from '../query-form-input';
import { QueryFormSqlEntity } from '../query-form-sql';

@Entity({ name: 'TB_QUERY_FORM', comment: 'DB정보' })
export class QueryFormEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: 'QueryForm명',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 4000,
    nullable: true,
    comment: '즐겨찾기',
  })
  favorites: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '설명',
  })
  description: string;

  @OneToMany(
    () => QueryFormInputEntity,
    (queryFormInputEntity) => queryFormInputEntity.queryForm,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  inputList: Promise<QueryFormInputEntity[]>;

  @OneToMany(
    () => QueryFormSqlEntity,
    (queryFormSqlEntity) => queryFormSqlEntity.queryForm,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  sqlList: Promise<QueryFormSqlEntity[]>;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveState;
}
