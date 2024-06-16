import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { QueryFormEntity } from '../query-form/query-form.entity';
import { QueryFormInputType } from '@entity/ppdm-sqlite-entity/share/data-type/query-form-input-type.enum';

@Entity({ name: 'TB_QUERY_FORM_INPUT', comment: 'DB정보' })
export class QueryFormInputEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '변수명',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: '제목',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '입력종류',
  })
  type: QueryFormInputType;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: '기본값',
  })
  defaultValue: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    comment: '데이터값',
  })
  arrayData: string;

  @ManyToOne(
    () => QueryFormEntity,
    (queryFormEntity) => queryFormEntity.inputList,
  )
  @JoinColumn([{ name: 'query_form_id', referencedColumnName: 'id' }])
  queryForm: Relation<QueryFormEntity>;
}
