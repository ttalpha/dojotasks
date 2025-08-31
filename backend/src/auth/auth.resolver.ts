import { Req, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { type Request } from 'express';
import { CurrentUser } from '../users/decorators';
import { CreateUserInput } from '../users/input';
import { AuthService } from './auth.service';
import { CookieAuthGuard, LocalAuthGuard } from './guards';
import { User } from '../users/entities/user';
import { LoginInput } from './input';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    const newUser = await this.authService.register(createUserInput);
    return newUser;
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => User, { name: 'login' })
  async login(@Args('loginInput') _: LoginInput, @CurrentUser() user: User) {
    return user;
  }

  @UseGuards(CookieAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @UseGuards(CookieAuthGuard)
  @Mutation(() => Boolean, { name: 'logout' })
  logout(@Context('req') req: Request) {
    req.logOut(() => {});
    req.session.cookie.maxAge = 0;
    return true;
  }
}
