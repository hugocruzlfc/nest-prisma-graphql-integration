import { SortOrder } from '@/shared/aplications/types';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { join } from 'path';

const GQL_ENUMS: Array<[object, string]> = [[SortOrder, 'SortOrder']];

for (const gqlEnum of GQL_ENUMS) {
  registerEnumType(gqlEnum[0], { name: gqlEnum[1] });
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      sortSchema: true,
    }),
  ],
})
export class GraphqlAdapterModule {}
