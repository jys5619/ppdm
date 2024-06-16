import { Column, Entity, OneToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { QueryFormRelSqlEntity } from '../query-form-rel-sql/query-form-rel-sql.entity';

@Entity({ name: 'TB_SQL', comment: 'SQL정보' })
export class SqlEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: '쿼리제목',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '설명',
  })
  description: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '쿼리문',
  })
  sql: string;

  /**
   * TB_SQL(1) => (N)TB_QUERY_FORM_REL_SQL(N) <= (1)TB_QUERY_FORM
   */
  @OneToMany(
    () => QueryFormRelSqlEntity,
    (queryFormRelSqlEntity) => queryFormRelSqlEntity.sql,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  queryFormRelSqlList: Promise<QueryFormRelSqlEntity[]>;
}
