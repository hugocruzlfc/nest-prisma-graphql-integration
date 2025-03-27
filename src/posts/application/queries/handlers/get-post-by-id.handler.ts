import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from '../impl/get-post-by-id.query';
import { Inject } from '@nestjs/common';
import { PostsService } from '@/posts/infrastructure/services/posts.service';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(query: GetPostByIdQuery) {
    return this.postsService.getPostById(query.postId);
  }
}
