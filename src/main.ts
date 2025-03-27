import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });

  // app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    console.log(`
       🚀 Server ready at: http://localhost:3000/graphql
     `);
  });
}
bootstrap();
