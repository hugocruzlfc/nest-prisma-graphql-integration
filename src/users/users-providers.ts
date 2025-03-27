import { Provider } from '@nestjs/common';
import { UserResolver } from './infrastructure/graphql/user.resolver';
import { UsersService } from './infrastructure/services/users.service';
import { GetUsersHandler } from './application/queries/handlers/get-all-users.handler';
import { GetDraftsByUserHandler } from './application/queries/handlers/get-draft-by-user-users.handler';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { GetUserPostsHandler } from './application/queries/handlers/get-user-post.handler';

const SERVICES: Provider[] = [UsersService];

const RESOLVERS: Provider[] = [UserResolver];

const QUERY_HANDLERS: Provider[] = [
  GetUsersHandler,
  GetDraftsByUserHandler,
  GetUserPostsHandler,
];

const COMMAND_HANDLERS: Provider[] = [CreateUserHandler];

export const USERS_PROVIDERS = [
  ...SERVICES,
  ...RESOLVERS,
  ...QUERY_HANDLERS,
  ...COMMAND_HANDLERS,
];
