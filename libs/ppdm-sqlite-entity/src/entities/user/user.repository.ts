import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CustomRepository } from '../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
