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
import { GetUsersQuery } from '@/users/aplication/queries/impl/get-users.query';

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ResolveField(() => [Post])
  async posts(@Root() user: User): Promise<Post[]> {
    const posts = await this.prismaService.user
      .findUnique({ where: { id: user.id } })
      .posts();
    return posts || [];
  }

  @Mutation(() => User)
  async signupUser(@Args('data') data: CreateUserInput): Promise<User> {
    const postData = data.posts?.map((post) => ({
      title: post.title,
      content: post.content || undefined,
    }));

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        posts: { create: postData },
      },
    });
  }

  @Query(() => [User])
  async all_users(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery(skip || 0, take || 10));
  }

  @Query(() => [Post], { nullable: true })
  async draftsByUser(
    @Args('userUniqueInput')
    userUniqueInput: UserUniqueInput,
  ): Promise<Post[] | null> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({ where: { published: false } });
  }
}
