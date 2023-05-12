import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER } from './common/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { LogConsumer } from './log.consumer';

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
        KafkaModule,
    ],
    providers: [LogConsumer],
})
export class AppModule {}
