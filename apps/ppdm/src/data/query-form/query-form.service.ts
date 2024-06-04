import { Injectable } from '@nestjs/common';
import { QueryFormCreateDto } from './dto/query-form-create.dto';
import { QueryFormDom } from '@doms/ppdm-dom/dom/data/query-form.dom';
import { QueryFormEntity } from '@entity/ppdm-sqlite-entity/entities/data/query-form';
import { QueryFormVo } from '@doms/ppdm-dom/vo/data';
import { DatabaseDom } from '@doms/ppdm-dom/dom/data';
import { QueryFormSqlDom } from '@doms/ppdm-dom/dom/data/query-form-sql.dom';

@Injectable()
export class QueryFormService {
  constructor(
    private readonly queryFormDom: QueryFormDom,
    private readonly queryFormSqlDom: QueryFormSqlDom,
    private readonly databaseDom: DatabaseDom,
  ) {}

  async getList(): Promise<QueryFormEntity[]> {
    return this.queryFormDom.findMany();
  }

  async get(id: string): Promise<QueryFormVo> {
    return await this.queryFormDom.get(id);
  }

  async create(
    queryFormCreateDto: QueryFormCreateDto,
  ): Promise<QueryFormEntity> {
    return this.queryFormDom.create(queryFormCreateDto);
  }

  async run(
    databaseId: string,
    queryFormId: string,
    inputData: { [x: string]: string | number | undefined },
  ) {
    const queryFormSqlList =
      await this.queryFormSqlDom.findManyByQueryFormId(queryFormId);

    for (const queryFormSql of queryFormSqlList) {
      await this.databaseDom.executeQuery(
        databaseId,
        queryFormSql.sql,
        inputData,
      );
    }
  }
}
