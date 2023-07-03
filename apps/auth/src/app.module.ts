import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CACHE_MAX_ITEMS,
    CACHE_TTL_MS,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_TYPE,
    DB_USER,
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
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/middlewares/logging.interceptor';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FileScalar } from './modules/gateway/utils/file-scalar';
import { formatError } from './common/utils/format-error';

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            include: [GatewayModule],
            autoSchemaFile: 'schema.gql',
            resolvers: {
                File: FileScalar,
            },
            formatError: formatError,
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
    providers: [LogConsumer, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
