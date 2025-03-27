import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '@/posts/infrastructure/graphql/types/post.gqltype';

@ObjectType({ description: 'User system' })
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;

  @Field((type) => [Post], { nullable: true })
  posts?: Post[] | null;
}
