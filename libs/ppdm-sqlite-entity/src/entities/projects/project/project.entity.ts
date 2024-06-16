import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PpdmBaseEntity } from '@entity/ppdm-sqlite-entity/share/base-entity/ppdm-base.entity';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { ProgramEntity } from '../../programs/program/program.entity';

@Entity({ name: 'TB_PROJECT', comment: '프로젝트정보' })
export class ProjectEntity extends PpdmBaseEntity {
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

  @ManyToMany(() => ProgramEntity, { cascade: true })
  @JoinTable({
    name: 'TB_PROJECT_PROGRAM',
    joinColumn: { name: 'PROJECT_ID', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'PROGRAM_ID', referencedColumnName: 'id' },
  })
  programList: ProgramEntity[];
}
