import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 30)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
