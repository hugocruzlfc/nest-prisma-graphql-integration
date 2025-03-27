import { Provider } from '@nestjs/common';
import { PrismaService } from './infrastructure/services/prisma.service';

const SERVICES: Provider[] = [PrismaService];

export const SHARED_PROVIDERS = [...SERVICES];
