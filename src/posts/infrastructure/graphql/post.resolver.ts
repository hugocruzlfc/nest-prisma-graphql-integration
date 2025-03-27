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
import { Post } from './types/post.gqltype';
import { User } from '@/users/infrastructure/graphql/types/user.gqltype';
import {
  CreatePostInput,
  PostOrderByUpdatedAtInput,
} from './dtos/create-post.gqlinput';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAuthorByPostIdQuery } from '@/posts/application/queries/impl/get-author-by-postid.query';
import { GetPostByIdQuery } from '@/posts/application/queries/impl/get-post-by-id.query';
import { GetFeedQuery } from '@/posts/application/queries/impl/get-feed.query';
import { CreateDraftCommand } from '@/posts/application/commands/impl/create-draft.command';
import { IncrementPostViewCountCommand } from '@/posts/application/commands/impl/increment-post-view-count.command';
import { DeletePostCommand } from '@/posts/application/commands/impl/delete-post.command';
import { TogglePublishPostCommand } from '@/posts/application/commands/impl/toggle-publish-post.command';

@Resolver(Post)
export class PostResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ResolveField()
  author(@Root() post: Post): Promise<User | null> {
    return this.queryBus.execute(new GetAuthorByPostIdQuery(post.id));
  }

  @Query(() => Post, { nullable: true })
  post_by_id(@Args('id') id: string): Promise<Post | null> {
    return this.queryBus.execute(new GetPostByIdQuery(id));
  }

  @Query(() => [Post])
  async feed(
    @Args('searchString', { nullable: true }) searchString?: string,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('orderBy', { nullable: true }) orderBy?: PostOrderByUpdatedAtInput,
  ): Promise<Post[]> {
    return this.queryBus.execute(
      new GetFeedQuery(searchString, skip, take, orderBy),
    );
  }

  @Mutation(() => Post)
  async create_draft(
    @Args('data') data: CreatePostInput,
    @Args('authorEmail', { type: () => String }) authorEmail: string,
  ): Promise<Post> {
    return this.commandBus.execute(
      new CreateDraftCommand(data.title, authorEmail, data.content),
    );
  }

  @Mutation(() => Post)
  async increment_post_view(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post> {
    return this.commandBus.execute(new IncrementPostViewCountCommand(id));
  }

  @Mutation(() => Post, { nullable: true })
  async toggle_publish_post(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post | null> {
    return this.commandBus.execute(new TogglePublishPostCommand(id));
  }

  @Mutation(() => Post, { nullable: true })
  async delete_post(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Post | null> {
    return this.commandBus.execute(new DeletePostCommand(id));
  }
}
