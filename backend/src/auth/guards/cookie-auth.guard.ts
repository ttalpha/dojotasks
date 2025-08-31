import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const req: Request = gqlContext.getContext().req;

    if (!req.isAuthenticated())
      throw new UnauthorizedException({
        success: false,
        message: 'You are not logged in to perform the action',
      });

    return true;
  }
}
