import { QueryFormSqlVo } from '@doms/ppdm-dom/vo/data';
import { QueryFormSqlRepository } from '@entity/ppdm-sqlite-entity/entities/data/query-form-sql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryFormSqlDom {
  constructor(
    private readonly queryFormSqlRepository: QueryFormSqlRepository,
  ) {}

  /**
   * ID로 Query Form 정보를 조회한다.
   * @param id
   * @returns
   */
  public async findManyByQueryFormId(
    queryFormId: string,
  ): Promise<QueryFormSqlVo[]> {
    return await this.queryFormSqlRepository.findManyByQueryFormId(queryFormId);
  }
}
