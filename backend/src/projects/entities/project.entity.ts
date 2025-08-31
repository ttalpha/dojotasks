import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => [User])
  members: User[];

  @Field(() => Date)
  createdAt: Date;
}
