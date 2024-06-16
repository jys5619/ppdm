import { Repository } from 'typeorm';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';
import { ProgramMenuEntity } from './program-menu.entity';

@CustomRepository(ProgramMenuEntity)
export class ProgramMenuRepository extends Repository<ProgramMenuEntity> {}
