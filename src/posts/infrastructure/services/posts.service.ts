import { PostOrderByUpdatedAt } from '@/posts/domain/interfaces/post-order-by-updated';
import { PrismaService } from '@/shared/infrastructure/services/prisma.service';
import { Post } from '@/users/domain/interfaces/post.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getAuthorByPostId(postId: string) {
    try {
      this.logger.log(`Fetching author for post with id ${postId}.`);
      return this.prismaService.post
        .findUnique({
          where: {
            id: postId,
          },
        })
        .author();
    } catch (error) {
      this.logger.error(
        `Error fetching author for post with id ${postId}.`,
        error,
      );
      return null;
    }
  }

  async getPostById(id: string): Promise<Post | null> {
    try {
      const post = await this.prismaService.post.findUnique({ where: { id } });
      this.logger.log(`Fetched post with id ${id}.`);
      return post;
    } catch (error) {
      this.logger.error(`Error fetching post with id ${id}.`, error);
      return null;
    }
  }

  async getFeed(
    searchString?: string,
    skip?: number,
    take?: number,
    orderBy?: PostOrderByUpdatedAt,
  ): Promise<Post[]> {
    try {
      const or = searchString
        ? {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          }
        : {};

      const posts = await this.prismaService.post.findMany({
        where: { published: true, ...or },
        take,
        skip,
        orderBy: orderBy ? { updatedAt: orderBy.updatedAt } : undefined,
      });

      this.logger.log(`Fetched ${posts.length} posts.`);
      return posts;
    } catch (error) {
      this.logger.error(`Error fetching posts`, error);
      return [];
    }
  }

  async createDraft(
    title: string,
    authorEmail: string,
    content?: string | null,
  ) {
    try {
      const newPost = await this.prismaService.post.create({
        data: {
          title: title,
          content: content,
          published: false,
          author: { connect: { email: authorEmail } },
        },
      });

      this.logger.log(`Created new post with id ${newPost.id}.`);
      return newPost;
    } catch (error) {
      this.logger.error(`Error creating new post.`, error);
      return null;
    }
  }

  async incrementPostViewCount(id: string) {
    try {
      const updatePost = await this.prismaService.post.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
      this.logger.log(`Incremented view count for post with id ${id}.`);
      return updatePost;
    } catch (error) {
      this.logger.error(
        `Error incrementing view count for post with id ${id}.`,
        error,
      );
      return null;
    }
  }

  async togglePublishPost(id: string) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!post) {
        this.logger.error(`Post with id ${id} not found.`);

        return null;
      }

      this.logger.log(`Toggling publish status for post with id ${id}.`);

      return this.prismaService.post.update({
        where: { id },
        data: { published: !post.published },
      });
    } catch (error) {
      this.logger.error(
        `Error toggling publish status for post with id ${id}.`,
        error,
      );
      return null;
    }
  }

  async deletePost(id: string) {
    try {
      const post = await this.prismaService.post.delete({ where: { id } });
      this.logger.log(`Deleted post with id ${id}.`);
      return post;
    } catch (error) {
      this.logger.error(`Error deleting post with id ${id}.`, error);
      return null;
    }
  }
}
