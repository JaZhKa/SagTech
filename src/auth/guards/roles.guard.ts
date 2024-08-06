import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Reflector } from '@nestjs/core';
import { userRole } from '../../users/users.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requiredRoles: userRole[] = this.reflector.get<userRole[]>(
      'roles',
      context.getHandler(),
    );
    const userRoles = await this.usersService.getUserRole(request.user.id);
    if (!userRoles) {
      return false;
    }
    return this.validateUserRole(requiredRoles, userRoles.roles);
  }

  validateUserRole(requiredRoles: userRole[], userRoles: userRole[]): boolean {
    return !!userRoles.filter((role) => requiredRoles.includes(role)).length;
  }
}
