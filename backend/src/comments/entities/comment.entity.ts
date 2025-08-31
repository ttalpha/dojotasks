import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => Int)
  taskId: number;

  @Field()
  authorId: number;

  @Field(() => User)
  author: User;
}
