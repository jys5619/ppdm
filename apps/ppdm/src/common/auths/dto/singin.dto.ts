import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: '사용자명',
    example: 'email@domain.com',
  })
  email?: string;

  @ApiProperty({
    description: '패스워드',
    example: '11111111',
  })
  password?: string;
}
