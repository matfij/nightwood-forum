import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { SignupDto } from '../../src/modules/auth/models/signup.dto';
import { RefreshTokenDto } from '../../src/modules/auth/models/refresh-token.dto';
import { JwtPayload } from '../../src/modules/auth/models/jwt-payload';
import { User } from '../../src/modules/users/models/user.entity';
import { UsersModule } from '../../src/modules/users/users.module';
import { GatewayModule } from '../../src/modules/gateway/gateway.module';

describe('gateway/auth controller', () => {
    let app: INestApplication;
    let httpServer: ReturnType<INestApplication['getHttpServer']>;
    let jwtService: JwtService;
    let usersRepository: Repository<User>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                UsersModule,
                GatewayModule,
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            ],
            providers: [JwtService, { provide: getRepositoryToken(User), useClass: Repository }],
        }).compile();
        app = moduleFixture.createNestApplication();
        httpServer = app.getHttpServer();
        jwtService = moduleFixture.get(JwtService);
        usersRepository = moduleFixture.get(getRepositoryToken(User));
        await app.init();
    });

    it('should fail to sign up with invalid dto (invalid password pattern)', async () => {
        const signupDto: SignupDto = {
            username: 'root',
            password: 'invalidPattern',
        };

        await request(httpServer).post('/api/auth/signup').send(signupDto).expect(400);
    });

    it('should sign up successfully', async () => {
        const dto: SignupDto = {
            username: 'root',
            password: 'ValidPattern50',
        };

        const res = await request(httpServer).post('/api/auth/signup').send(dto).expect(201);

        expect(res.body['id']).toBeDefined();
        expect(res.body['username']).toEqual(dto.username);
    });

    it('should fail to refresh token with invalid refresh token', async () => {
        const dto: RefreshTokenDto = {
            token: 'invalidToken',
        };

        await request(httpServer).post('/api/auth/refreshToken').send(dto).expect(401);
    });

    it('should successfully refresh token', async () => {
        const payload: JwtPayload = {
            id: 'id',
            username: 'root',
            isRefresh: true,
        };
        const dto: RefreshTokenDto = {
            token: jwtService.sign(payload),
        };

        await request(httpServer).post('/api/auth/refreshToken').send(dto).expect(200);
    });

    it('should fail to read user data with invalid authorization header (refresh instead of access)', async () => {
        const user = usersRepository.create({ username: 'root', password: 'ValidPattern50' });
        await usersRepository.save(user);
        const payload: JwtPayload = {
            id: user.id,
            username: user.username,
            isRefresh: true,
        };
        const token = jwtService.sign(payload);

        await request(httpServer).get('/api/auth/me').set('Authorization', `Bearer ${token}`).expect(401);
    });

    it('should read authorized user data successfully', async () => {
        const user = usersRepository.create({ username: 'root', password: 'ValidPattern50' });
        await usersRepository.save(user);
        const payload: JwtPayload = {
            id: user.id,
            username: user.username,
            isRefresh: false,
        };
        const token = jwtService.sign(payload);

        const res = await request(httpServer).get('/api/auth/me').set('Authorization', `Bearer ${token}`).expect(200);

        expect(res.body['id']).toEqual(user.id);
        expect(res.body['username']).toEqual(user.username);
    });
});
