import { Repository } from 'typeorm';
import { QueryFormSqlEntity } from './query-form-sql.entity';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(QueryFormSqlEntity)
export class QueryFormSqlRepository extends Repository<QueryFormSqlEntity> {
  async findManyByQueryFormId(
    queryFormId: string,
  ): Promise<QueryFormSqlEntity[]> {
    const qb = this.createQueryBuilder('QueryFormSqlEntity');

    if (queryFormId)
      qb.andWhere('QueryFormSqlEntity.queryFormId = :queryFormId', {
        queryFormId,
      });
    return await qb.getMany();
  }
}
