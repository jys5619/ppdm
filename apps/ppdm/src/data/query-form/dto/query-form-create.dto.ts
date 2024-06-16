import { QueryFormInputVo, SqlVo } from '@doms/ppdm-dom/vo/data';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFormCreateDto {
  @ApiProperty({
    description: '제목',
    example: 'SQL1',
  })
  title: string;

  @ApiProperty({
    description: '즐겨찾기',
    example: '#1 #2 #3',
  })
  favorites?: string;

  @ApiProperty({
    description: '설명',
    example: 'SQL1 Description',
  })
  description?: string;

  @ApiProperty({
    description: '입력값',
    example: [
      { name: 'v1', title: 'V1필드', type: 'INPUT', arrayData: '' },
      { name: 'v2', title: 'V2필드', type: 'SELECT', arrayData: 'AA|BB|CC' },
    ],
  })
  inputList?: QueryFormInputVo[];

  @ApiProperty({
    description: '쿼리문',
    example: [
      {
        title: '쿼리문1',
        description: '쿼리문1 설명',
        sql: 'SELECT :v1, :v2 FROM DUAL',
      },
      {
        title: '쿼리문2',
        description: '쿼리문2 설명',
        sql: 'SELECT :v1, :v2 FROM DUAL',
      },
    ],
  })
  sqlList?: SqlVo[];

  @ApiProperty({
    description: '상태값',
    example: 'Active',
  })
  state?: ActiveInactiveState;
}
