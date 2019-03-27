import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroOrmMiddleware } from './modules/orm/mikro-orm.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(app.get(MikroOrmMiddleware).resolve());
  await app.listen(3000);
}
bootstrap();
