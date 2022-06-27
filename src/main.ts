import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Hello World')
    .setDescription('The Hello World API description')
    .setVersion('1.0')
    .addTag('helloWorld')
    .build();

    const helloWorldDocument = SwaggerModule.createDocument(app, options, {
      include: [AppModule],
    });
    SwaggerModule.setup('api/docs', app, helloWorldDocument,{
      explorer: true,
      swaggerOptions:{
        filter: true,
        showRequestDuration: true,
      },
    });

  await app.listen(3000);
}
bootstrap();
