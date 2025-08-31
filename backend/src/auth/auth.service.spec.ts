import argon2 from 'argon2';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../../generated/prisma';
import { userFixture } from '../users/test-utils';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserInput } from '../users/input';

jest.mock('argon2');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let cache: Cache;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            confirmEmail: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    user = userFixture();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('register', () => {
    let createUserInput: CreateUserInput;
    beforeEach(() => {
      createUserInput = {
        password: user.password,
        email: user.email,
        name: user.name,
      };
      (argon2.hash as jest.Mock) = jest.fn().mockResolvedValue('hash');
    });
    it('should create a user successfully', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(user);
      const result = await authService.register(createUserInput);
      expect(result).toEqual(user);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith({
        ...createUserInput,
        password: 'hash',
      });
    });

    it('should throw a bad request exception if username/email already exists', async () => {
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValue(new BadRequestException());
      expect(authService.register(createUserInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
