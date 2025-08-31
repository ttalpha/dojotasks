import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginInput } from '../input';

export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  getRequest(context: ExecutionContext) {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecutionContext.getContext();
    const gqlArgs = gqlExecutionContext.getArgs() as { loginInput: LoginInput };

    gqlContext.req.body = { ...gqlContext.req.body, ...gqlArgs.loginInput };
    return gqlContext.req as Request;
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
      const req = this.getRequest(context);
      await super.logIn(req);
      return true;
    } catch (error) {
      throw new BadRequestException('Wrong email or password provided');
    }
  }
}
