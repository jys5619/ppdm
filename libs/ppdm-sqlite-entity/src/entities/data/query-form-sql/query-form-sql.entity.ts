import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { QueryFormEntity } from '../query-form/query-form.entity';

@Entity({ name: 'TB_QUERY_FORM_SQL', comment: 'DB정보' })
export class QueryFormSqlEntity extends PpdmBaseEntity {
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

  @ManyToOne(
    () => QueryFormEntity,
    (queryFormEntity) => queryFormEntity.sqlList,
  )
  @JoinColumn([{ name: 'query_form_id', referencedColumnName: 'id' }])
  queryForm: Relation<QueryFormEntity>;
}
