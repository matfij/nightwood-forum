import { Module, ValidationPipe } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { GeneratorService } from './services/generator.service';
import { APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME_SYNC } from '../../common/config';
import { ProjectSyncConsumer } from './services/project-sync.consumer';
import { ProjectsResolver } from './resolvers/projects.resolver';

@Module({
    imports: [CacheModule.register(), BullModule.registerQueue({ name: QUEUE_NAME_SYNC }), AuthModule, UsersModule],
    controllers: [GatewayController],
    providers: [
        GeneratorService,
        ProjectSyncConsumer,
        ProjectsResolver,
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
