import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS — allow the Next.js frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe (uses class-validator decorators)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Global API prefix
  app.setGlobalPrefix('api');

  // Swagger docs at /api/docs
  const config = new DocumentBuilder()
    .setTitle('Jamea Platform API')
    .setDescription('Backend API for the Jamea Educational Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 Jamea API running at http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at   http://localhost:${port}/api/docs`);
}
bootstrap();
