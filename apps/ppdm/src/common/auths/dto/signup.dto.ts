import { UserRoleVo, UserVo } from '@doms/ppdm-dom/vo/common';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: '사용자',
    example: {
      name: '홍길동',
      email: 'email@domain.com',
      password: '11111111',
    },
  })
  user: UserVo;

  @ApiProperty({
    description: '역할명',
    example: [{ name: 'USER' }],
  })
  roles?: UserRoleVo[];
}
