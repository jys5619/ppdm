import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class PpdmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true, comment: '생성일시' })
  createdAt: Date;

  @CreateDateColumn({ nullable: true, comment: '수정일시' })
  updatedAt: Date;
}
