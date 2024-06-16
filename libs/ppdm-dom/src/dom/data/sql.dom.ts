import { SqlVo } from '@doms/ppdm-dom/vo/data';
import { SqlRepository } from '@entity/ppdm-sqlite-entity/entities/data/sql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlDom {
  constructor(private readonly sqlRepository: SqlRepository) {}

  /**
   * ID로 Query Form 정보를 조회한다.
   * @param id
   * @returns
   */
  public async findManyByQueryFormId(queryFormId: string): Promise<SqlVo[]> {
    return await this.sqlRepository.findManyById(queryFormId);
  }
}
