import { Provider } from '@nestjs/common';
import { PostResolver } from './infrastructure/graphql/post.resolver';

const SERVICES: Provider[] = [];

const RESOLVERS: Provider[] = [PostResolver];

export const POSTS_PROVIDERS = [...SERVICES, ...RESOLVERS];
