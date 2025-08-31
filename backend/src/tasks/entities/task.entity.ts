import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '../../../generated/prisma';
import { User } from '../../users/entities/user.entity';

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

  @Field(() => Date)
  createdAt: Date;
}
