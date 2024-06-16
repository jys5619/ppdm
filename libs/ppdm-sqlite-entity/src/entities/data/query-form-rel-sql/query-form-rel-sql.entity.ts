import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { QueryFormEntity } from '../query-form';
import { SqlEntity } from '../sql';

@Entity({ name: 'TB_QUERY_FORM_REL_SQL', comment: 'Query From Relation Sql' })
export class QueryFormRelSqlEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveState;

  /**
   * TB_QUERY_FORM(1) => (N)TB_QUERY_FORM_REL_SQL
   */
  @ManyToOne(
    () => QueryFormEntity,
    (queryFormEntity) => queryFormEntity.queryFormRelSqlList,
  )
  @JoinColumn([{ name: 'query_form_id', referencedColumnName: 'id' }])
  public queryForm: Relation<QueryFormEntity>;

  /**
   * TB_SQL(1) => (N)TB_QUERY_FORM_REL_SQL
   */
  @ManyToOne(() => SqlEntity, (sqlEntity) => sqlEntity.queryFormRelSqlList)
  @JoinColumn([{ name: 'sql_id', referencedColumnName: 'id' }])
  public sql: Relation<SqlEntity>;
}
