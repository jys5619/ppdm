import { Repository } from 'typeorm';
import { QueryFormRelSqlEntity } from './query-form-rel-sql.entity';
import { CustomRepository } from '@entity/ppdm-sqlite-entity/share/customer-repository';

@CustomRepository(QueryFormRelSqlEntity)
export class QueryFormRelSqlRepository extends Repository<QueryFormRelSqlEntity> {}
