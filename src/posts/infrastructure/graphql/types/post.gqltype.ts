import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '@/users/infrastructure/graphql/types/user.gqltype';

@ObjectType({
  description: 'A post created by a user',
})
export class Post {
  @Field((type) => Int)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  content?: string | null;

  @Field((type) => Boolean, { nullable: true })
  published?: boolean | null;

  @Field((type) => Int, { description: 'Number post count' })
  viewCount: number;

  @Field((type) => User, { nullable: true })
  author?: User | null;
}
