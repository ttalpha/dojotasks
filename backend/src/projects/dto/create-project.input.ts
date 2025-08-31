import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, Length, Min } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @Length(1, 60)
  name: string;

  @Field(() => [Int])
  @IsInt({ each: true })
  @Min(1, { each: true })
  memberIds: number[];
}
