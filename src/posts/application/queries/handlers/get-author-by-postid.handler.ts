import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { UsersService } from '@/users/infrastructure/services/users.service';
import { GetAuthorByPostIdQuery } from '../impl/get-author-by-postid.query';
import { PostsService } from '@/posts/infrastructure/services/posts.service';

@QueryHandler(GetAuthorByPostIdQuery)
export class GetAuthorByPostIdHandler
  implements IQueryHandler<GetAuthorByPostIdQuery>
{
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(query: GetAuthorByPostIdQuery) {
    const { userId } = query;
    return this.postsService.getAuthorByPostId(userId);
  }
}
