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
            providers: [
                JwtService,
                { provide: getRepositoryToken(User), useClass: Repository },
                {
                    provide: ProducerService,
                    useValue: { produce: jest.fn().mockResolvedValue(true) },
                },
                {
                    provide: KafkaProducer,
                    useValue: { produce: jest.fn().mockResolvedValue(true) },
                },
            ],
        })
            .useMocker((token) => {
                if (token === ProducerService) {
                    return { produce: jest.fn().mockResolvedValue(true) };
                }
                if (token === KafkaProducer) {
                    return { produce: jest.fn().mockResolvedValue(true) };
                }
            })
            .compile();
        app = moduleFixture.createNestApplication();
        httpServer = app.getHttpServer();
        jwtService = moduleFixture.get(JwtService);
        usersRepository = moduleFixture.get(getRepositoryToken(User));
        await app.init();
    });

    xit('should fail to sign up with invalid dto (invalid password pattern)', async () => {
        const query = `{
            "operationName":"Signup",
            "variables":{
                "signupDto":{}},
                "query":"mutation Signup($signupDto: SignupDto!) {
                    signup(signupDto: $signupDto) {
                        id
                        username
                        accessToken
                        refreshToken
                        __typename
                    }
                }"
            }`;

        await request(httpServer).post('/graphql').send({ query: query }).expect(400);
    });

    it('should sign up successfully', async () => {
        const query = `mutation {signup(signupDto:{username:"userpro", password:"secretAA77"}){id}}`;

        const res = await request(httpServer).post('/graphql').send({ query }).expect(200);

        console.log(res);
    });

    xit('should fail to refresh token with invalid refresh token', async () => {
        const dto: RefreshTokenDto = {
            token: 'invalidToken',
        };

        await request(httpServer).post('/api/auth/refreshToken').send(dto).expect(401);
    });

    xit('should successfully refresh token', async () => {
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

    xit('should fail to read user data with invalid authorization header (refresh instead of access)', async () => {
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

    xit('should read authorized user data successfully', async () => {
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
