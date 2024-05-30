import { Repository } from 'typeorm';
import { DatabaseEntity } from './database.entity';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';

@CustomRepository(DatabaseEntity)
export class DatabaseRepository extends Repository<DatabaseEntity> {}
