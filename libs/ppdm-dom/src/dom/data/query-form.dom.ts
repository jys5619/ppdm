import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { QueryFormVo } from '@doms/ppdm-dom/vo/data';
import {
  QueryFormEntity,
  QueryFormRepository,
} from '@entity/ppdm-sqlite-entity/entities/data/query-form';
import { QueryFormInputRepository } from '@entity/ppdm-sqlite-entity/entities/data/query-form-input';
import { QueryFormSqlRepository } from '@entity/ppdm-sqlite-entity/entities/data/query-form-sql';
import { QueryFormInputType } from '@entity/ppdm-sqlite-entity/share/data-type/query-form-input-type.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryFormDom {
  constructor(
    private readonly queryFormRepository: QueryFormRepository,
    private readonly queryFormInputRepository: QueryFormInputRepository,
    private readonly queryFormSqlRepository: QueryFormSqlRepository,
  ) {}

  /**
   *  Query Form 정보를 조회한다.
   * @param id
   * @returns
   */
  public async findMany(): Promise<QueryFormEntity[]> {
    return await this.queryFormRepository.find();
  }

  /**
   * ID로 Query Form 정보를 조회한다.
   * @param id
   * @returns
   */
  public async get(id: string): Promise<QueryFormEntity> {
    const queryFormEntity = await this.queryFormRepository.findOne({
      where: { id },
    });

    await queryFormEntity.inputList;
    await queryFormEntity.sqlList;

    return queryFormEntity;
  }

  /**
   * Query Form 정보를 생성한다.
   * @param userVo
   * @param userRoleList
   * @returns
   */
  public async create(queryFormVo: QueryFormVo) {
    const message = await this.createValidation(queryFormVo);
    if (message) {
      throw new PpdmHttpException(message);
    }

    const queryForm = new QueryFormEntity();
    queryForm.title = queryFormVo.title;
    queryForm.favorites = queryFormVo.favorites;
    queryForm.description = queryFormVo.description;
    queryForm.state = queryFormVo.state;

    if (queryFormVo.inputList && queryFormVo.inputList.length > 0) {
      const queryFormInputList = await this.queryFormInputRepository.save(
        queryFormVo.inputList,
      );
      queryForm.inputList = new Promise((resolve) =>
        resolve(queryFormInputList),
      );
    }

    const queryFormSqlList = await this.queryFormSqlRepository.save(
      queryFormVo.sqlList,
    );
    queryForm.sqlList = new Promise((resolve) => resolve(queryFormSqlList));

    return await this.queryFormRepository.save(queryForm);
  }

  /**
   * 사용자 정보를 검증한다.
   * @param userVo
   * @returns
   */
  public async createValidation(queryFormVo: QueryFormVo): Promise<string> {
    if (!queryFormVo.title) {
      return '제목을 입력하십시오.';
    }
    if (!queryFormVo.state) {
      return '상태값을 입력하십시오.';
    }

    if (queryFormVo.inputList && queryFormVo.inputList.length > 0) {
      for (const input of queryFormVo.inputList) {
        if (!input.name) {
          return 'Input 변수명을 입력하십시오.';
        }
        if (!input.type) {
          return 'Input 종류를 입력하십시오.';
        }
        if (input.type === QueryFormInputType.SELECT && !input.arrayData) {
          return 'Select에 출력할 값을 입력하십시오.';
        }
      }
    }

    if (!queryFormVo.sqlList || queryFormVo.sqlList.length < 0) {
      return '쿼리문을 1건 이상 입력하십시오.';
    } else {
      for (const sql of queryFormVo.sqlList) {
        if (!sql.title) {
          return '제목을 입력하십시오.';
        }
        if (!sql.sql) {
          return '쿼리문을 입력하십시오.';
        }
      }
    }
  }
}
