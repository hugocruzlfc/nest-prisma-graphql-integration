import { PrismaService } from '@/shared/infrastructure/services/prisma.service';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
}
