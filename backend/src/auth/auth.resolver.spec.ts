import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/input';
import { User } from '../../generated/prisma';
import { userFixture } from '../users/test-utils';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthResolver],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
    user = userFixture();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('register', () => {
    let createUserInput: CreateUserInput;
    beforeEach(() => {
      createUserInput = {
        password: user.password,
        email: user.email,
        name: user.name,
      };
    });
    it('should create a user successfully', async () => {
      jest.spyOn(service, 'register').mockResolvedValue(user);
      const result = await resolver.register(createUserInput);
      expect(result).toEqual(user);
      expect(service.register).toHaveBeenCalledTimes(1);
      expect(service.register).toHaveBeenCalledWith(createUserInput);
    });

    it('should throw a bad request exception if username/email already exists', async () => {
      jest
        .spyOn(service, 'register')
        .mockRejectedValue(new BadRequestException());
      expect(resolver.register(createUserInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should return the current user', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      expect(
        await resolver.login({ email: user.email, password: 'hash' }),
      ).toEqual(user);
      expect(service.validateUser).toHaveBeenCalledWith(user.email, 'hash');
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      expect(await resolver.me(user)).toEqual(user);
    });
  });

  describe('logout', () => {
    it('should invalidate cookie', async () => {
      const req = {
        logOut: jest.fn(),
        session: {
          cookie: { maxAge: 100000 },
        },
      } as unknown as Request;
      resolver.logout(req);
      expect(req.logOut).toHaveBeenCalled();
      expect(req.session.cookie.maxAge).toBe(0);
    });
  });
});
