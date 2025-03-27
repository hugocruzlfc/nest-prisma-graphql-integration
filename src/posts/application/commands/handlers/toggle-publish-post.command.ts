import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PostsService } from '@/posts/infrastructure/services/posts.service';

import { Inject } from '@nestjs/common';
import { TogglePublishPostCommand } from '../impl/toggle-publish-post.command';

@CommandHandler(TogglePublishPostCommand)
export class TogglePublishPostCommandHandler
  implements IQueryHandler<TogglePublishPostCommand>
{
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(command: TogglePublishPostCommand) {
    return this.postsService.togglePublishPost(command.postId);
  }
}
