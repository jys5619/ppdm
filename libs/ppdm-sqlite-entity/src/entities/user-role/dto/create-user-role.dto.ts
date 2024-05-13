import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({
    description: '사용자명',
    example: '홍길동',
  })
  name: string;
}
