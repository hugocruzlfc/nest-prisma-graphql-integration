import { Provider } from '@nestjs/common';
import { UserResolver } from './infrastructure/graphql/user.resolver';
import { UsersService } from './infrastructure/services/users.service';
import { GetUsersHandler } from './aplication/queries/handlers/get-all-users.handler';

const SERVICES: Provider[] = [UsersService];

const RESOLVERS: Provider[] = [UserResolver];

const QUERY_HANDLERS: Provider[] = [GetUsersHandler];

export const USERS_PROVIDERS = [...SERVICES, ...RESOLVERS, ...QUERY_HANDLERS];
