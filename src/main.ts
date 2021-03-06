import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
 

  await app.listen(3000);
}
bootstrap();
