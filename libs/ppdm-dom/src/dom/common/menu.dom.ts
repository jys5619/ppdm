import { PpdmHttpException } from '@app/ppdm-common/exception/ppdm-http-exception';
import { MenuVo } from '@doms/ppdm-dom/vo/common/menu.vo';
import {
  MenuEntity,
  MenuRepository,
} from '@entity/ppdm-sqlite-entity/entities/common/menu';
import { MenuRoleRepository } from '@entity/ppdm-sqlite-entity/entities/common/menu-role';
import { RoleType } from '@entity/ppdm-sqlite-entity/share/data-type';
import { ActiveInactiveState } from '@entity/ppdm-sqlite-entity/share/state';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuDom {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly menuRoleRepository: MenuRoleRepository,
  ) {}

  /**
   * ID로 사용자 정보를 조회한다.
   * @param id
   * @returns
   */
  public async findMany({
    name,
    roles,
    parentId,
    state,
  }: {
    name?: string;
    roles?: RoleType[];
    parentId?: string;
    state?: ActiveInactiveState;
  }): Promise<MenuEntity[]> {
    return await this.menuRepository.findMany({ name, roles, parentId, state });
  }

  /**
   * 사용자 정보를 생성한다.
   * @param userVo
   * @param userRoleList
   * @returns
   */
  public async createList(menuList: MenuVo[]) {
    menuList.forEach((menuVo) => {
      const message = this.createValidation(menuVo);
      if (message) {
        throw new PpdmHttpException(message);
      }
    });

    const result: MenuEntity[] = [];

    for (const menuVo of menuList) {
      result.push(await this.create(menuVo));
    }
    return result;
  }

  /**
   * 사용자 정보를 생성한다.
   * @param userVo
   * @param userRoleList
   * @returns
   */
  public async create(menuVo: MenuVo) {
    const message = this.createValidation(menuVo);
    if (message) {
      throw new PpdmHttpException(message);
    }
    const menu: MenuEntity = new MenuEntity();
    menu.name = menuVo.name;
    menu.url = menuVo.url;
    menu.state = ActiveInactiveState.Active;
    menu.menu =
      menuVo.parentId &&
      this.menuRepository.findOne({ where: { id: menuVo.parentId } });
    menu.sequence = menuVo.sequence;
    const menuRoles = await this.menuRoleRepository.save(menuVo.roles);
    menu.roles = new Promise((resolve) => resolve(menuRoles));

    return await this.menuRepository.save(menu);
  }

  /**
   * 사용자 정보를 검증한다.
   * @param userVo
   * @returns
   */
  public createValidation(menuVo: MenuVo): string {
    if (!menuVo.name) {
      return '메뉴명을 입력하십시오.';
    }
    if (!menuVo.url) {
      return 'URL을 입력하십시오.';
    }
    if (!menuVo.roles || menuVo.roles.length === 0) {
      return '권한을 입력하십시오.';
    }
    if (!menuVo.sequence) {
      return '순번을 입력하십시오.';
    }
  }
}
