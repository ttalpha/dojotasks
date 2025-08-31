import * as argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register({ password, ...createUserInput }: CreateUserInput) {
    const hashedPassword = await argon2.hash(password);
    const user = await this.usersService.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return user;
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new BadRequestException();
      await this.verifyPassword(user.password, password);
      return user;
    } catch (error) {
      if (error instanceof BadRequestException)
        throw new BadRequestException('Wrong email or password provided');
      else throw new InternalServerErrorException();
    }
  }

  private async verifyPassword(hashed: string, plain: string) {
    const isCorrectPassword = await argon2.verify(hashed, plain);
    if (!isCorrectPassword) throw new BadRequestException();
  }
}
