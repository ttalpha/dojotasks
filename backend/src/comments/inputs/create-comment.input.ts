import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, Length, Min } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @Length(1, 60)
  text: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  taskId: number;
}
