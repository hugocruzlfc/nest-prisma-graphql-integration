import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PostsService } from '@/posts/infrastructure/services/posts.service';

import { Inject } from '@nestjs/common';
import { IncrementPostViewCountCommand } from '../impl/increment-post-view-count.command';

@CommandHandler(IncrementPostViewCountCommand)
export class IncrementPostViewCountCommandHandler
  implements IQueryHandler<IncrementPostViewCountCommand>
{
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(command: IncrementPostViewCountCommand) {
    return this.postsService.incrementPostViewCount(command.postId);
  }
}
