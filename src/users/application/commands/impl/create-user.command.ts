import { Post } from '@/users/domain/interfaces/post.interface';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly name?: string | null,
    public readonly posts?: Post[],
  ) {}
}
