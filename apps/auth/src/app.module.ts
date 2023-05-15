import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER } from './common/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { LogConsumer } from './log.consumer';
import { EventsModule } from './modules/events/events.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

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
