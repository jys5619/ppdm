import { UserRepository } from '@entity/ppdm-sqlite-entity/entities/common/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.find();
  }
}
