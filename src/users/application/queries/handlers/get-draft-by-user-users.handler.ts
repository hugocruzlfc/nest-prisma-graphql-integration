import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { UsersService } from '@/users/infrastructure/services/users.service';
import { GetDraftsByUserQuery } from '../impl/get-drafts-by-user';

@QueryHandler(GetDraftsByUserQuery)
export class GetDraftsByUserHandler
  implements IQueryHandler<GetDraftsByUserQuery>
{
  constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  execute(query: GetDraftsByUserQuery) {
    const { id, email } = query;
    return this.usersService.draftsByUser(id, email);
  }
}
