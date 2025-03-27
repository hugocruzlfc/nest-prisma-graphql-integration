import { SortOrder } from '@/shared/aplications/types';
import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @MinLength(3)
  title: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  content?: string | null;
}

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
  updatedAt: SortOrder;
}
