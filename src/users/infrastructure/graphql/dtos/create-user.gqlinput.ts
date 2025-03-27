import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string | null;
}
