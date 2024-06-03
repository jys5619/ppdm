import { Repository } from 'typeorm';
import { QueryFormEntity } from './query-form.entity';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(QueryFormEntity)
export class QueryFormRepository extends Repository<QueryFormEntity> {}
