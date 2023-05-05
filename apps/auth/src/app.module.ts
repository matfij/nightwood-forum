import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USER } from './common/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASSWORD,
        }),
    ],
})
export class AppModule {}
