import { RoleType } from '@app/ppdm-sqlite-entity/entities/user-role/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자명',
    example: '홍길동',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '사용자명',
    example: 'email@domain.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: '패스워드',
    example: '11111111',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '역할명',
    example: '["USER"]',
  })
  roles?: RoleType[];
}
