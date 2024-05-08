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

  @ApiProperty({
    description: '패스워드',
    example: '11111111',
  })
  password: string;
}
