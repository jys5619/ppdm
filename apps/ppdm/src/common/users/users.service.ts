import { UserRepository } from '@entity/ppdm-sqlite-entity/entities/common/user';
import { UserRoleRepository } from '@entity/ppdm-sqlite-entity/entities/common/user-role';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }
}
