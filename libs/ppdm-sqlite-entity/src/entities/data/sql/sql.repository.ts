import { Repository } from 'typeorm';
import { SqlEntity } from './sql.entity';
import { CustomRepository } from '@entity/ppdm-sqlite-entity/share/customer-repository';

@CustomRepository(SqlEntity)
export class SqlRepository extends Repository<SqlEntity> {
  async findManyById(id: string): Promise<SqlEntity[]> {
    const qb = this.createQueryBuilder('Sql')
      .innerJoin('Sql.queryFormRelSqlList', 'queryFormRelSql')
      .where('queryFormRelSql.sql_id = :sqlId', {
        sqlId: id,
      });

    return await qb.getMany();
  }
}
