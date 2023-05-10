import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER } from './common/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: DB_TYPE,
        //     host: DB_HOST,
        //     port: DB_PORT,
        //     username: DB_USER,
        //     password: DB_PASSWORD,
        //     autoLoadEntities: true,
        //     synchronize: true,
        // }),
        GatewayModule,
        AuthModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {}
