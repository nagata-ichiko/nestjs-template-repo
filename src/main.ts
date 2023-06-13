import { NestFactory } from '@nestjs/core';
import { dump } from 'js-yaml';
import { writeFile } from 'fs-extra';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: prodモードだとswaggerを出力しないように
  createSwaggerDocument(app);
  await app.listen(3000);
}

async function createSwaggerDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('nest-sample')
    .setDescription('nest-sampleApi')
    .setVersion('1.0')
    .addTag('nest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = dump(document, {
    skipInvalid: true,
    noRefs: true,
  });

  const dirPath = join('.dev', 'api');
  const yamlPath = join(dirPath, 'openapi.yml');
  mkdirSync(dirPath, { recursive: true });
  writeFile(yamlPath, yamlDocument);

  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
