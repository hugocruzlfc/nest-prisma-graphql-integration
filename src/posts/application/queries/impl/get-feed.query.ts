import { PostOrderByUpdatedAt } from '@/posts/domain/interfaces/post-order-by-updated';

export class GetFeedQuery {
  constructor(
    public readonly searchString?: string,
    public readonly skip?: number,
    public readonly take?: number,
    public readonly orderBy?: PostOrderByUpdatedAt,
  ) {}
}
