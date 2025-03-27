import { PrismaService } from '@/shared/infrastructure/services/prisma.service';
import { Post } from '@/users/domain/interfaces/post.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUserPosts(userId: string): Promise<Post[]> {
    try {
      const posts = await this.prismaService.user
        .findUnique({ where: { id: userId } })
        .posts();

      this.logger.log(`Fetched ${posts?.length} posts for user ${userId}.`);
      return posts || [];
    } catch (error) {
      this.logger.error(`Error fetching posts for user ${userId}`, error);
      return [];
    }
  }

  async getUsers(skip: number, take: number) {
    try {
      const users = await this.prismaService.user.findMany({
        skip,
        take,
      });

      this.logger.log(`Fetched ${users.length} users.`);
      return users;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async draftsByUser(userId?: string, email?: string) {
    try {
      const posts = await this.prismaService.user
        .findUnique({
          where: {
            id: userId,
            email,
          },
        })
        .posts({ where: { published: false } });

      this.logger.log(`Fetched ${posts?.length} drafts by user.`);
      return posts;
    } catch (error) {
      this.logger.error('Error fetching drafts by user', error);
      return null;
    }
  }

  async createUser(email: string, name?: string | null, posts?: Post[]) {
    try {
      const postData = posts?.map((post) => ({
        title: post.title,
        content: post.content || undefined,
      }));

      const user = await this.prismaService.user.create({
        data: {
          email,
          name,
          posts: { create: postData },
        },
      });

      this.logger.log(`Created user whit email ${user.email}.`);

      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
      return null;
    }
  }
}
