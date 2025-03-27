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
import { Post } from './types/post.gqltype';
import { User } from '@/users/infrastructure/graphql/types/user.gqltype';
import {
  CreatePostInput,
  PostOrderByUpdatedAtInput,
} from './dtos/create-post.gqlinput';
import { PrismaService } from '@/shared/infrastructure/services/prisma.service';

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  author(@Root() post: Post): Promise<User | null> {
    return this.prismaService.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author();
  }

  @Query((returns) => Post, { nullable: true })
  postById(@Args('id') id: string) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  @Query(() => [Post])
  async feed(
    @Args('searchString', { nullable: true }) searchString?: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('orderBy', { nullable: true }) orderBy?: PostOrderByUpdatedAtInput,
  ): Promise<Post[]> {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {};

    return this.prismaService.post.findMany({
      where: { published: true, ...or },
      take,
      skip,
      orderBy: orderBy ? { updatedAt: orderBy.updatedAt } : undefined,
    });
  }

  @Mutation(() => Post)
  async createDraft(
    @Args('data') data: CreatePostInput,
    @Args('authorEmail', { type: () => String }) authorEmail: string,
  ): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content || undefined,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    });
  }

  @Mutation(() => Post)
  async incrementPostViewCount(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post> {
    return this.prismaService.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }

  @Mutation(() => Post, { nullable: true })
  async togglePublishPost(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post | null> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      select: { published: true },
    });
    if (!post) return null;

    return this.prismaService.post.update({
      where: { id },
      data: { published: !post.published },
    });
  }

  @Mutation(() => Post, { nullable: true })
  async deletePost(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<Post | null> {
    return this.prismaService.post.delete({ where: { id } });
  }
}
