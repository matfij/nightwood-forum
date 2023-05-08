import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_API_SCHEMA_PATH, APP_PORT } from './common/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder().setTitle('NotionGen').build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(APP_API_SCHEMA_PATH, JSON.stringify(document));
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    app.enableCors();
    setupSwagger(app);
    await app.listen(APP_PORT);
}
bootstrap();
