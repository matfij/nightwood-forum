import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CACHE_MAX_ITEMS,
    CACHE_TTL_MS,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_TYPE,
    DB_USER,
    QUEUE_MAX_CONCURRENT_JOBS,
    QUEUE_MAX_EXECUTED_JOBS,
    QUEUE_MAX_JOB_TIME_MS,
    REDIS_HOST,
    REDIS_PORT,
} from './common/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { LogConsumer } from './log.consumer';
import { EventsModule } from './modules/events/events.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),
        CacheModule.register({
            ttl: CACHE_TTL_MS,
            max: CACHE_MAX_ITEMS,
        }),
        BullModule.forRoot({
            redis: {
                host: REDIS_HOST,
                port: REDIS_PORT,
            },
            limiter: {
                max: QUEUE_MAX_EXECUTED_JOBS,
                duration: QUEUE_MAX_JOB_TIME_MS,
            },
        }),
        GatewayModule,
        AuthModule,
        UsersModule,
        EventsModule,
    ],
    providers: [LogConsumer],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/api');
    }
}
