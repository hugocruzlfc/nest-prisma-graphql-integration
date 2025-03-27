import { CreatePostInput } from '@/posts/infrastructure/graphql/dtos/create-post.gqlinput';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  ValidateIf,
  IsDefined,
} from 'class-validator';

@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  email: string;

  @ValidateIf((o) => !o.id && !o.email)
  @IsDefined({
    message: 'At least one of the following fields must be defined: id, email',
  })
  private readonly _check?: never;
}

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

  @Field((type) => [CreatePostInput], { nullable: true })
  posts?: CreatePostInput[];
}
