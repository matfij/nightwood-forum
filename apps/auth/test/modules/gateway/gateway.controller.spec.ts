import { GatewayController } from '../../../src/modules/gateway/gateway.controller';
import { AuthService } from '../../../src/modules/auth/service/auth.service';
import { GeneratorService } from '../../../src/modules/gateway/services/generator.service';
import { SignupDto } from '../../../src/modules/auth/models/signup.dto';
import { SigninDto } from '../../../src/modules/auth/models/signin.dto';
import { ProjectCreateDto } from 'src/modules/gateway/models/project-create.dto';
import { AuthorizedRequest } from 'src/modules/auth/models/authorized-request';

describe('GatewayController', () => {
    let controller: GatewayController;
    let authService: AuthService;
    let generatorService: GeneratorService;

    beforeEach(async () => {
        authService = {
            signup: jest.fn(),
            signin: jest.fn(),
        } as any;
        generatorService = {
            createProject: jest.fn(),
            generate: jest.fn(),
        } as any;
        controller = new GatewayController(authService, generatorService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('auth endpoints', () => {
        it('should call signup method', () => {
            const dto: SignupDto = { username: 'test', password: 'test' };

            controller.signup(dto);

            expect(authService.signup).toBeCalledWith(dto);
        });

        it('should call signin method', () => {
            const dto: SigninDto = { username: 'test', password: 'test' };

            controller.signin(dto);

            expect(authService.signin).toBeCalledWith(dto);
        });
    });

    describe('generator endpoints', () => {
        it('should call createProject method', () => {
            const req: AuthorizedRequest = {
                user: {
                    id: 'k01d29k120d',
                    username: 'test user',
                },
            };
            const dto: ProjectCreateDto = {
                notionId: 'n2093j029jf3f',
                notionAccessCode: '02391ed810j99d0d9102jd',
                notionName: 'test project',
            };

            controller.generatorCreateProject(req, dto);

            expect(generatorService.createProject).toBeCalledWith(req.user.id, dto);
        });

        it('should call generateProject method', () => {
            const projectId = '02k30k93';

            controller.generatorWebsite(projectId);

            expect(generatorService.generate).toHaveBeenCalledWith(projectId);
        });
    });
});
