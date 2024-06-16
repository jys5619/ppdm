import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { ProjectEntity } from '../../projects/project/project.entity';
import { ProgramMenuEntity } from '../program-menu/program-menu.entity';
import { ProgramFlowEntity } from '../program-flow/program-flow.entity';

@Entity({ name: 'TB_PROGRAM', comment: '프로그램정보' })
export class ProgramEntity extends PpdmBaseEntity {
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

  @OneToMany(
    () => ProgramMenuEntity,
    (programMenuEntity) => programMenuEntity.program,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  programMenuList: Promise<ProgramMenuEntity[]>;

  @OneToMany(
    () => ProgramFlowEntity,
    (programFlowEntity) => programFlowEntity.program,
    {
      onDelete: 'CASCADE',
      lazy: true,
    },
  )
  programFlowList: Promise<ProgramFlowEntity[]>;

  @ManyToMany(() => ProjectEntity, { cascade: true })
  projecteList: ProjectEntity[];
}
