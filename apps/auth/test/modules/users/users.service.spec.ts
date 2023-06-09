import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { UsersService } from '../../../src/modules/users/services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/modules/users/models/user.entity';
import { UserCreateDto } from '../../../src/modules/users/models/user-create.dto';

describe('UsersService', () => {
    let usersService: UsersService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn((user) => {
                            return {
                                id: 'kd20193d02',
                                ...user,
                            };
                        }),
                        save: jest.fn((user) => user),
                        findOne: jest.fn(({ where: { id } }) => {
                            return {
                                id: id,
                                username: 'test',
                                password: 'test',
                            };
                        }),
                    },
                },
            ],
        }).compile();
        usersService = moduleRef.get(UsersService);
        userRepository = moduleRef.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

    it('should create user successfully', async () => {
        const dto: UserCreateDto = {
            username: 'test',
            password: 'test',
        };

        const user = await usersService.create(dto);

        expect(user.id).toBeDefined();
        expect(user.username).toEqual(user.username);
        expect(user.password).toEqual(user.password);
    });

    it('should fail to read non-existing user by id', async () => {
        const userId = '01dk93kd01';
        userRepository.findOne = jest.fn().mockReturnValue(undefined);

        const user = await usersService.readById(userId);

        expect(user).toBeUndefined();
        expect(userRepository.findOne).toBeCalledWith({ where: { id: userId } });
    });

    it('should read existing user by id', async () => {
        const userId = '01dk93kd01';

        const user = await usersService.readById(userId);

        expect(user).toBeDefined();
        expect(userId).toEqual(user.id);
    });
});
