import { Provider } from '@nestjs/common';
import { UserResolver } from './infrastructure/graphql/user.resolver';

const SERVICES: Provider[] = [];

const RESOLVERS: Provider[] = [UserResolver];

export const USERS_PROVIDERS = [...SERVICES, ...RESOLVERS];
