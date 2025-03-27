import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphqlAdapterModule } from './shared/infrastructure/modules/graphql-adapter.module';

@Module({
  imports: [CqrsModule.forRoot(), GraphqlAdapterModule],
})
export class AppModule {}
