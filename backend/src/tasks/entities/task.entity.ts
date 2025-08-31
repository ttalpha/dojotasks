import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '../../../generated/prisma';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String)
  status: TaskStatus;

  @Field(() => [User])
  assignees: User[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Date)
  createdAt: Date;
}
