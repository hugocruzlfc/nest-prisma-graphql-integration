import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from './types/user.gqltype';
import { Post } from '@/posts/infrastructure/graphql/types/post.gqltype';
import { CreateUserInput, UserUniqueInput } from './dtos/create-user.gqlinput';
import { PrismaService } from '@/shared/infrastructure/services/prisma.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@/users/application/queries/impl/get-users.query';
import { GetDraftsByUserQuery } from '@/users/application/queries/impl/get-drafts-by-user';
import { CreateUserCommand } from '@/users/application/commands/impl/create-user.command';
import { GetUserPostsQuery } from '@/users/application/queries/impl/get-user-posts.query';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ResolveField(() => [Post])
  posts(@Root() user: User): Promise<Post[]> {
    return this.queryBus.execute(new GetUserPostsQuery(user.id));
  }

  @Mutation(() => User)
  create_user(@Args('data') data: CreateUserInput): Promise<User> {
    return this.commandBus.execute(
      new CreateUserCommand(data.email, data.name, data.posts),
    );
  }

  @Query(() => [User])
  all_users(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery(skip || 0, take || 10));
  }

  @Query(() => [Post], { nullable: true })
  drafts_by_user(
    @Args('userUniqueInput')
    userUniqueInput: UserUniqueInput,
  ): Promise<Post[] | null> {
    return this.queryBus.execute(
      new GetDraftsByUserQuery(userUniqueInput.id, userUniqueInput.email),
    );
  }
}
