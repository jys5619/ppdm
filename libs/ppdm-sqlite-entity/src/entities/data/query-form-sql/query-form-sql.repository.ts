import { Repository } from 'typeorm';
import { QueryFormSqlEntity } from './query-form-sql.entity';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(QueryFormSqlEntity)
export class QueryFormSqlRepository extends Repository<QueryFormSqlEntity> {}
