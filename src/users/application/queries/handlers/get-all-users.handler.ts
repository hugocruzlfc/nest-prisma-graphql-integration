import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl/get-users.query';
import { Inject } from '@nestjs/common';
import { UsersService } from '@/users/infrastructure/services/users.service';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  execute(query: GetUsersQuery) {
    const { skip, take } = query;
    return this.usersService.getUsers(skip, take);
  }
}
