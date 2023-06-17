import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_API_SCHEMA_PATH, APP_PORT } from './common/config';

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder().setTitle('NotionGen').build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(APP_API_SCHEMA_PATH, JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    setupSwagger(app);
    await app.listen(APP_PORT);
}
bootstrap();
