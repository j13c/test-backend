import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './docs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupSwagger(app);
 
  app.useGlobalPipes(new ValidationPipe( {whitelist: true, forbidNonWhitelisted: true} ));
  
  await app.listen(3000);
}
bootstrap();
