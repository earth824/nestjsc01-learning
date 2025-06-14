import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@/auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );
  // app.useGlobalGuards();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

// Last Tuesday
// Nest? server side app: HTTP, WS, Microservice (express, fastify)
// Module? project structure using module: Main ==> App Module
// express group by controller, routing, service
// Controller? handle routing: incoming request and sent the response
// Pipe? Validate and transform
// DI (dependency injection)

// Today(8/6/2025)
// Recap OOP, Dependency Injection
// Service?, Provider?, Authentication?, Prisma ORM, JWT, Guard

// Controller ==> handle routing, logic ==> Service

// Today(14/6/2025)
// Authentication(cont.) login, Configuration module Type safe (PORT: 0 to 65535, SECRET_KEY) : (process.env.SECRET_KEY)? BAD_PRACTICE
// GUARD (proteced resource), Custom Decorator
