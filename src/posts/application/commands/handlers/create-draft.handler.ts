import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { CreateDraftCommand } from '../impl/create-draft.command';
import { PostsService } from '@/posts/infrastructure/services/posts.service';

@CommandHandler(CreateDraftCommand)
export class CreateDraftHandler implements IQueryHandler<CreateDraftCommand> {
  constructor(
    @Inject()
    private readonly postsService: PostsService,
  ) {}

  execute(command: CreateDraftCommand) {
    const { title, authorId, content } = command;
    return this.postsService.createDraft(title, authorId, content);
  }
}
