import { DbType } from '@entity/ppdm-sqlite-entity/share/data-type';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { ApiProperty } from '@nestjs/swagger';

export class DatabaseCreateDto {
  @ApiProperty({
    description: 'dbType',
    example: 'ORACLE',
  })
  dbType: DbType;

  @ApiProperty({
    description: 'dbName',
    example: 'DEV',
  })
  dbName: string;

  @ApiProperty({
    description: 'connectString',
    example: 'localhost:1521/ORCL',
  })
  connectString: string;

  @ApiProperty({
    description: 'username',
    example: 'ppdm',
  })
  username?: string;

  @ApiProperty({
    description: 'password',
    example: 'ppdm12',
  })
  password?: string;

  @ApiProperty({
    description: 'poolName',
    example: 'ppdm_dev',
  })
  poolName?: string;

  @ApiProperty({
    description: 'poolMin',
    example: 1,
  })
  poolMin?: number;

  @ApiProperty({
    description: 'poolMax',
    example: 3,
  })
  poolMax?: number;

  @ApiProperty({
    description: 'timeout',
    example: 300,
  })
  timeout?: number;

  @ApiProperty({
    description: 'state',
    example: 'Active',
  })
  state?: ActiveInactiveState;
}
