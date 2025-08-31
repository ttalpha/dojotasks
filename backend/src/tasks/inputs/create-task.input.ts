import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsInt, Length, Min } from 'class-validator';
import { TaskStatus } from '../../../generated/prisma';

@InputType()
export class CreateTaskInput {
  @Field()
  @Length(1, 120)
  title: string;

  @Field(() => String)
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @Field(() => [Int])
  @IsInt({ each: true })
  @Min(1, { each: true })
  assigneeIds: number[];

  @Field(() => Int)
  @IsInt()
  @Min(1)
  projectId: number;
}
