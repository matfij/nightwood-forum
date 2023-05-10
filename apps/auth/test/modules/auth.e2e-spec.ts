import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('gateway/auth controller', () => {
    let app: INestApplication;
    let httpServer;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        httpServer = app.getHttpServer();
        await app.init();
    });
});
