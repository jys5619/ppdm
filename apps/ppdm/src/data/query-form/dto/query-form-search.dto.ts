import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFormSearchDto {
  @ApiProperty({
    description: '제목',
    example: 'DEPT',
  })
  title?: string;

  @ApiProperty({
    description: '상태값',
    example: 'Active',
  })
  state?: ActiveInactiveState;
}
