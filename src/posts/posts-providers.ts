import { Provider } from '@nestjs/common';
import { PostResolver } from './infrastructure/graphql/post.resolver';
import { PostsService } from './infrastructure/services/posts.service';
import { GetAuthorByPostIdHandler } from './application/queries/handlers/get-author-by-postid.handler';
import { GetFeedHandler } from './application/queries/handlers/get-feed.handler';
import { GetPostByIdIdHandler } from './application/queries/handlers/get-post-by-id.handler';
import { CreateDraftHandler } from './application/commands/handlers/create-draft.handler';
import { IncrementPostViewCountCommandHandler } from './application/commands/handlers/increment-post-view.handler';
import { TogglePublishPostCommandHandler } from './application/commands/handlers/toggle-publish-post.command';
import { DeletePostCommandHandler } from './application/commands/handlers/delete-post.command';

const SERVICES: Provider[] = [PostsService];

const RESOLVERS: Provider[] = [PostResolver];

const QUERY_HANDLERS: Provider[] = [
  GetAuthorByPostIdHandler,
  GetFeedHandler,
  GetPostByIdIdHandler,
];

const COMMAND_HANDLERS: Provider[] = [
  CreateDraftHandler,
  IncrementPostViewCountCommandHandler,
  TogglePublishPostCommandHandler,
  DeletePostCommandHandler,
];

export const POSTS_PROVIDERS = [
  ...SERVICES,
  ...RESOLVERS,
  ...QUERY_HANDLERS,
  ...COMMAND_HANDLERS,
];
