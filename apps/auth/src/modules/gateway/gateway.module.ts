import { Module, ValidationPipe } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { GeneratorService } from './services/generator.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [GatewayController],
    providers: [
        GeneratorService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
})
export class GatewayModule {}
