import { UserRoleEntity } from '@app/ppdm-sqlite-entity/entities/user-role/user-role.entity';
import { UserEntity } from '@app/ppdm-sqlite-entity/entities/user/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PpdmRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;
    const userRoles = Promise.apply(user.roles) as UserRoleEntity[];

    return userRoles && userRoles.some((role) => roles.includes(role.name));
  }
}
