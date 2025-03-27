import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PostsService } from '@/posts/infrastructure/services/posts.service';
import { GetFeedQuery } from '../impl/get-feed.query';

@QueryHandler(GetFeedQuery)
export class GetFeedHandler implements IQueryHandler<GetFeedQuery> {
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(query: GetFeedQuery) {
    const { searchString, skip, take, orderBy } = query;
    return this.postsService.getFeed(searchString, skip, take, orderBy);
  }
}
