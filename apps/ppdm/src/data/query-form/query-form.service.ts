import { Injectable } from '@nestjs/common';
import { QueryFormCreateDto } from './dto/query-form-create.dto';
import { QueryFormDom } from '@doms/ppdm-dom/dom/data/query-form.dom';
import { QueryFormEntity } from '@entity/ppdm-sqlite-entity/entities/data/query-form';
import { QueryFormVo } from '@doms/ppdm-dom/vo/data';

@Injectable()
export class QueryFormService {
  constructor(private readonly queryFormDom: QueryFormDom) {}

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
}
