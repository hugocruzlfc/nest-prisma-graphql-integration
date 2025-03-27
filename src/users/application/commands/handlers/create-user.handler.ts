import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { UsersService } from '@/users/infrastructure/services/users.service';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  execute(command: CreateUserCommand) {
    const { email, name, posts } = command;
    return this.usersService.createUser(email, name, posts);
  }
}
