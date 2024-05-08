import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/ppdm-sqlite-entity/entities/user/user.repository';
import { CreateUserDto } from '@app/ppdm-sqlite-entity/entities/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/ppdm-sqlite-entity/entities/user/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    const { id, ...dto } = updateUserDto;
    return this.userRepository.update(id, dto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
