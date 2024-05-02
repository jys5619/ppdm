import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자명',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '사용자명',
    example: 'email@domain.com',
  })
  email: string;
}
