import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'apps/ppdm/src/share/decorator/ppdm-public-auth';
import SystemUtil from 'apps/ppdm/src/share/util/system.util';
import { Observable } from 'rxjs';

@Injectable()
export class PpdmRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const roles = [
      SystemUtil.getInstance().env.jwt.siteAccessUserRole || 'USER',
    ];
    const { user } = context.switchToHttp().getRequest();

    return (
      user.roles && user.roles.some((role: string) => roles.includes(role))
    );
  }
}
