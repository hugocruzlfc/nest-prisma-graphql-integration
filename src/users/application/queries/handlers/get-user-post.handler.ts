import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { UsersService } from '@/users/infrastructure/services/users.service';
import { GetUserPostsQuery } from '../impl/get-user-posts.query';

@QueryHandler(GetUserPostsQuery)
export class GetUserPostsHandler implements IQueryHandler<GetUserPostsQuery> {
  constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  execute(query: GetUserPostsQuery) {
    const { userId } = query;
    return this.usersService.getUserPosts(userId);
  }
}
