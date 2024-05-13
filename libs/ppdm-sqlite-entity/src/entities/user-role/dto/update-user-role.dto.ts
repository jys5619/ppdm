import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends CreateUserRoleDto {
  @ApiProperty({ description: 'ID' })
  id?: string;
}
