import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
    }),
  });

  // app.enableShutdownHooks();
  await app.listen(3000, () => {
    console.log(`
       🚀 Server ready at: http://localhost:3000/graphql
     `);
  });
}
bootstrap();
