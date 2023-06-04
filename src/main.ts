import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './exception/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTags } from './helpers/swagger.helpers';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Workout api - Course Yourself')
    .setDescription('The Course Yourself api description')
    .setVersion('1.0')
    .addTag(
      SwaggerTags.AUTH,
      'Everything you need to authorize or unauthorize user',
    )
    .addTag(SwaggerTags.USERS, 'Users routes')
    .addTag(SwaggerTags.GROUPS, 'Groups routes')
    .addTag(SwaggerTags.WORKOUTS, 'Workouts routes')
    .addTag(SwaggerTags.EXERCISES, 'Exercises routes')
    .addTag(SwaggerTags.NOTIFICATIONS, 'Notifications routes')
    .addTag(SwaggerTags.PROGRESSES, 'Progresses routes')
    .addTag(SwaggerTags.ANALYTICS, 'Analytics routes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
