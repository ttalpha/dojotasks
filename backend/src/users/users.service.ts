import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { PrismaError } from '../prisma/error.enum';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const newUser = await this.prisma.user.create({
        data: { ...createUserInput },
        omit: { password: true },
      });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException('Email already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        omit: { password: true },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === PrismaError.RecordNotFound)
          throw new NotFoundException('Cannot find user with the given id');
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
