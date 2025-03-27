import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PostsService } from '@/posts/infrastructure/services/posts.service';

import { Inject } from '@nestjs/common';
import { DeletePostCommand } from '../impl/delete-post.command';

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler
  implements IQueryHandler<DeletePostCommand>
{
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(command: DeletePostCommand) {
    return this.postsService.deletePost(command.postId);
  }
}
