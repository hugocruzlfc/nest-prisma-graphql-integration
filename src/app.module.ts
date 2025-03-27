import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphqlAdapterModule } from './shared/infrastructure/modules/graphql-adapter.module';
import { SHARED_PROVIDERS } from './shared/shared-providers';
import { USERS_PROVIDERS } from './users/users-providers';
import { POSTS_PROVIDERS } from './posts/posts-providers';

@Module({
  imports: [CqrsModule.forRoot(), GraphqlAdapterModule],
  providers: [...SHARED_PROVIDERS, ...USERS_PROVIDERS, ...POSTS_PROVIDERS],
})
export class AppModule {}
