import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { UserRoleVo, UserVo } from '@doms/ppdm-dom/vo/common';
import {
  UserEntity,
  UserRepository,
} from '@entity/ppdm-sqlite-entity/entities/common/user';
import {
  UserRoleEntity,
  UserRoleRepository,
} from '@entity/ppdm-sqlite-entity/entities/common/user-role';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDom {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  /**
   * ID로 사용자 정보를 조회한다.
   * @param id
   * @returns
   */
  public async get(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }
  /**
   * 사용자 정보를 생성한다.
   * @param userVo
   * @param userRoleList
   * @returns
   */
  public async create(userVo: UserVo, userRoleList: UserRoleVo[]) {
    const message = await this.createValidation(userVo);
    if (!message) {
      throw new PpdmHttpException(message);
    }

    const user: UserEntity = new UserEntity();
    user.name = userVo.name;
    user.email = userVo.email;
    user.password = await bcrypt.hash(userVo.password, 10);

    if (userRoleList && userRoleList.length > 0) {
      const userRoles = await this.userRoleRepository.save(userRoleList);
      user.roles = new Promise<UserRoleEntity[]>((resolve) =>
        resolve(userRoles),
      );
    }

    return await this.userRepository.save(user);
  }

  /**
   * 사용자 정보를 검증한다.
   * @param userVo
   * @returns
   */
  public async createValidation(userVo: UserVo): Promise<string> {
    if (userVo.name) {
      return '사용자명을 입력하십시오.';
    }
    if (userVo.email) {
      return '이메일을 입력하십시오.';
    }
    if (userVo.password) {
      return '패스워드를 입력하십시오.';
    }

    const findUser = await this.findOneByEmail(userVo.email);

    if (findUser) {
      return '이미 등록된 이메일입니다.';
    }
  }

  /**
   * 이메일로 사용자 정보를 조회한다.
   * @param email
   * @returns
   */
  public async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async isMatchPassword(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
  }
}
