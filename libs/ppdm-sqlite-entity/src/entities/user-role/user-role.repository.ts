import { Repository } from 'typeorm';
import { CustomRepository } from '../../share/customer-repository/typeorm-ex.decorator';
import { UserRoleEntity } from './user-role.entity';

@CustomRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {}
