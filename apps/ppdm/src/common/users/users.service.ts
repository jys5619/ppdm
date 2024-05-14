import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/ppdm-sqlite-entity/entities/user/user.repository';
import { CreateUserDto } from 'apps/ppdm/src/common/auths/dto/create-user.dto';
import { UserRoleRepository } from '@app/ppdm-sqlite-entity/entities/user-role/user-role.repository';
import { UserRoleEntity } from '@app/ppdm-sqlite-entity/entities/user-role/user-role.entity';
import { UserEntity } from '@app/ppdm-sqlite-entity/entities/user/user.entity';
// import { UserRoleEntity } from '@app/ppdm-sqlite-entity/entities/user-role/user-role.entity';
// import { UserEntity } from '@app/ppdm-sqlite-entity/entities/user/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userRolesDto = createUserDto.roles.map((r) => {
      return { name: r };
    });
    const userRoles = await this.userRoleRepository.save(userRolesDto);

    const user: UserEntity = new UserEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.roles = new Promise<UserRoleEntity[]>((resolve) => resolve(userRoles));

    return await this.userRepository.save(user);
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

  async update() {
    // updateUserDto: UpdateUserDto
    // const { id, ...dto } = updateUserDto;
    return null; ///this.userRepository.update(id, dto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
