import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';

import { ProgramEntity } from '../program/program.entity';
import { QueryFormEntity } from '../../data/query-form';
import { ProgramMenuEntity } from '../program-menu/program-menu.entity';

@Entity({ name: 'TB_PROGRAM_FLOW', comment: '프로그램흐름정보' })
export class ProgramFlowEntity extends PpdmBaseEntity {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    comment: 'QueryForm명',
  })
  name: string;

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
   * TB_PROGRAM(1) -> (N)TB_PROGRAM_FLOW
   */
  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programFlowList,
  )
  @JoinColumn([{ name: 'program_id', referencedColumnName: 'id' }])
  program: Relation<ProgramEntity>;

  /**
   * TB_PROGRAM_MENU(N) -> (N)TB_PROGRAM_FLOW
   */
  @ManyToMany(() => ProgramMenuEntity, { cascade: true })
  programMenuList: ProgramMenuEntity[];

  /**
   * TB_PROGRAM_FLOW(N) -> (N)TB_QUERY_FORM
   */
  @ManyToMany(() => ProgramFlowEntity, { cascade: true })
  @JoinTable({
    name: 'TB_PROGRAM_FLOW_QUERY_FORM',
    joinColumn: { name: 'PROGRAM_FLOW_ID', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'QUERY_FORM_ID', referencedColumnName: 'id' },
  })
  queryFormList: QueryFormEntity[];
}
