import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { RefreshTokenDto } from '../../src/modules/auth/models/refresh-token.dto';
import { JwtPayload } from '../../src/modules/auth/models/jwt-payload';
import { User } from '../../src/modules/users/models/user.entity';
import { UsersModule } from '../../src/modules/users/users.module';
import { GatewayModule } from '../../src/modules/gateway/gateway.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { formatError } from '../../src/common/utils/format-error';
import { ProducerService } from '../../src/modules/events/services/producer.service';
import { KafkaProducer } from '../../src/modules/events/services/kafka.producer';
import { AuthModule } from '../../src/modules/auth/auth.module';

describe('Auth Resolver', () => {
    let app: INestApplication;
    let httpServer: ReturnType<INestApplication['getHttpServer']>;
    let jwtService: JwtService;
    let usersRepository: Repository<User>;
    const produceMock = jest.fn();

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                UsersModule,
                GatewayModule,
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,
                    include: [GatewayModule],
                    autoSchemaFile: 'schema.gql',
                    formatError: formatError,
                    playground: false,
                    nodeEnv: 'development',
                }),
            ],
            providers: [{ provide: getRepositoryToken(User), useClass: Repository }],
        })
            .overrideProvider(ProducerService)
            .useValue({ produce: produceMock })
            .compile();
        app = moduleFixture.createNestApplication();
        httpServer = app.getHttpServer();
        jwtService = moduleFixture.get(JwtService);
        usersRepository = moduleFixture.get(getRepositoryToken(User));
        await app.init();
    });

    it('should fail to sign up with invalid dto (invalid password pattern)', async () => {
        const query = `
            mutation {signup(signupDto:{username:"userpro", password:"secret"}){ id }}
        `;

        const res = await request(httpServer).post('/graphql').send({ query }).expect(200);

        expect(res.body.errors).toBeDefined();
        expect(produceMock).not.toHaveBeenCalled();
    });

    it('should sign up successfully', async () => {
        const query = `
            mutation {signup(signupDto:{username:"userpro", password:"secretAA77"}){ id username accessToken }}
        `;

        const res = await request(httpServer).post('/graphql').send({ query }).expect(200);

        expect(res.body.data.signup.id).toBeDefined();
        expect(res.body.data.signup.username).toEqual('userpro');
        expect(res.body.data.signup.accessToken).toBeDefined();
        expect(produceMock).toHaveBeenCalledWith({
            data: { id: res.body.data.signup.id, username: res.body.data.signup.username },
            topic: 'signup',
        });
    });

    it('should fail to refresh token with invalid refresh token', async () => {
        const query = `
            mutation {refreshToken(refreshTokenDto:{token:"token"}){ token }}
        `;

        const res = await request(httpServer).post('/graphql').send({ query }).expect(200);

        expect(res.body.errors.toBeDefined);
    });

    it('should successfully refresh token', async () => {
        const payload: JwtPayload = {
            id: 'id',
            username: 'root',
            isRefresh: true,
        };
        const token = jwtService.sign(payload);
        const query = `
            mutation {refreshToken(refreshTokenDto:{token:"${token}"}){ token }}
        `;

        const res = await request(httpServer).post('/graphql').send({ query }).expect(200);

        expect(res.body.data.refreshToken).toBeDefined();
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
        const query = `query {me {username}}`;

        const res = await request(httpServer)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({ query })
            .expect(200);

        expect(res.body.errors).toBeDefined();
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
        const query = `query {me {username}}`;

        const res = await request(httpServer)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({ query })
            .expect(200);

        expect(res.body.data.me.username).toEqual(user.username);
    });
});
