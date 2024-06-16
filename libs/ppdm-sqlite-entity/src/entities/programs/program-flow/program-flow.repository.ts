import { Repository } from 'typeorm';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';
import { ProgramFlowEntity } from './program-flow.entity';

@CustomRepository(ProgramFlowEntity)
export class ProgramFlowRepository extends Repository<ProgramFlowEntity> {}
