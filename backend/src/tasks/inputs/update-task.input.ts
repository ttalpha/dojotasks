import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdateTaskInput extends OmitType(PartialType(CreateTaskInput), [
  'projectId',
]) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;
}
