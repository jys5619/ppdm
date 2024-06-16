import { Repository } from 'typeorm';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';
import { ProgramEntity } from './program.entity';

@CustomRepository(ProgramEntity)
export class ProgramRepository extends Repository<ProgramEntity> {}
