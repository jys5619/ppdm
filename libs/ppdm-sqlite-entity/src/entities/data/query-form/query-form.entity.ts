import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { QueryFormInputEntity } from '../query-form-input';
import { ProgramMenuEntity } from '../../programs/program-menu/program-menu.entity';
import { ProgramFlowEntity } from '../../programs/program-flow/program-flow.entity';
import { QueryFormRelSqlEntity } from '../query-form-rel-sql/query-form-rel-sql.entity';

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

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '상태',
  })
  state: ActiveInactiveState;

  /**
   * TB_QUERY_FORM(1) => (N)TB_QUERY_FORM_INPUT
   */
  @OneToMany(
    () => QueryFormInputEntity,
    (queryFormInputEntity) => queryFormInputEntity.queryForm,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  inputList: Promise<QueryFormInputEntity[]>;

  /**
   * TB_QUERY_FORM(1) => (N)TB_QUERY_FORM_REL_SQL(N) <= (1)TB_SQL
   */
  @OneToMany(
    () => QueryFormRelSqlEntity,
    (queryFormRelSqlEntity) => queryFormRelSqlEntity.queryForm,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  queryFormRelSqlList: Promise<QueryFormRelSqlEntity[]>;

  /**
   * TB_PROGRAM_MENU(N) -> (N)TB_QUERY_FORM
   */
  @ManyToMany(() => ProgramMenuEntity, { cascade: true })
  programMenuList: ProgramMenuEntity[];

  /**
   * TB_PROGRAM_FLOW(N) -> (N)TB_QUERY_FORM
   */
  @ManyToMany(() => ProgramFlowEntity, { cascade: true })
  programFlowList: ProgramFlowEntity[];
}
