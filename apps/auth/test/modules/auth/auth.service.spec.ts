import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/modules/auth/service/auth.service';
import { ProducerService } from '../../../src/modules/events/services/producer.service';
import { UsersService } from '../../../src/modules/users/services/users.service';
import { SignupDto } from '../../../src/modules/auth/models/signup.dto';
import { EventTopic } from '../../../src/.shared/topics';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let producerService: ProducerService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [AuthService, JwtService],
        })
            .useMocker((token) => {
                if (token === UsersService) {
                    return {
                        readByUsername: jest.fn(),
                        create: jest.fn().mockImplementation((dto) => {
                            return {
                                id: '09234ek02k3e0',
                                ...dto,
                            };
                        }),
                    };
                }
                if (token === ProducerService) {
                    return { produce: jest.fn() };
                }
            })
            .compile();

        authService = moduleRef.get(AuthService);
        usersService = moduleRef.get(UsersService);
        producerService = moduleRef.get(ProducerService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should fail to signup with non-unique username', async () => {
        const dto: SignupDto = {
            username: 'existingUser',
            password: 'test',
        };

        usersService.readByUsername = jest.fn().mockResolvedValue({ username: 'existingUser' });

        await expect(authService.signup(dto)).rejects.toThrowError('Username must be unique');
        expect(usersService.readByUsername).toHaveBeenCalledWith(dto.username);
    });

    it('should signup successfully', async () => {
        const dto: SignupDto = {
            username: 'newUser',
            password: 'test',
        };
        const tokens = ['accessToken', 'refreshToken'];
        authService.generateTokens = jest.fn().mockReturnValue(tokens);

        const user = await authService.signup(dto);

        expect(user.id).toBeDefined();
        expect(user.username).toEqual(dto.username);
        expect(user.accessToken).toEqual(tokens[0]);
        expect(producerService.produce).toBeCalledWith({
            topic: EventTopic.Signup,
            data: {
                id: user.id,
                username: user.username,
            },
        });
    });
});
