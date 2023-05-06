import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER } from './common/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

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
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
