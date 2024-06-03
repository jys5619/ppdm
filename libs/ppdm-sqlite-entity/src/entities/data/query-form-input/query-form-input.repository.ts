import { Repository } from 'typeorm';
import { QueryFormInputEntity } from './query-form-input.entity';
import { CustomRepository } from '@entity/ppdm-sqlite-entity/share/customer-repository';

@CustomRepository(QueryFormInputEntity)
export class QueryFormInputRepository extends Repository<QueryFormInputEntity> {}
