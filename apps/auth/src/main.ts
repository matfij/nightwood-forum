import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './common/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(APP_PORT);
    console.log('auth-app started');
}
bootstrap();
