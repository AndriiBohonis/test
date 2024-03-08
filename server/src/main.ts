import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('API_PORT');

  const config = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription('API for managing todo list')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port || 3000, () => {
    console.log(`started on ${port}`);
  });
}
bootstrap();
