import { Repository } from 'typeorm';
import { CustomRepository } from '../../../share/customer-repository/typeorm-ex.decorator';
import { ProjectEntity } from './project.entity';

@CustomRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {}
