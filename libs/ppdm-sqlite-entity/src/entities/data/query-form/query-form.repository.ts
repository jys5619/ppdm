import { Repository } from 'typeorm';
import { QueryFormEntity } from './query-form.entity';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(QueryFormEntity)
export class QueryFormRepository extends Repository<QueryFormEntity> {
  async findBySearch(
    title?: string,
    state?: string,
  ): Promise<QueryFormEntity[]> {
    const qb = this.createQueryBuilder('QF');
    if (state) {
      qb.andWhere('QF.state = :state', { state });
    }
    if (title) {
      qb.andWhere("QF.title LIKE '%' || :title || '%'", { title });
    }

    return await qb.getMany();
  }
}
