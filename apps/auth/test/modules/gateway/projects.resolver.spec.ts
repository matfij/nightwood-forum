import { GeneratorService } from '../../../src/modules/gateway/services/generator.service';
import { ProjectCreateDto } from 'src/modules/gateway/models/project-create.dto';
import { ProjectsResolver } from '../../../src/modules/gateway/resolvers/projects.resolver';
import { getProjectDtoStub } from '../../common/stubs';

describe('ProjectsResolver', () => {
    let projectsResolver: ProjectsResolver;
    let generatorService: GeneratorService;

    beforeEach(async () => {
        generatorService = {
            createProject: jest.fn(),
            readProjects: jest.fn(),
            readProject: jest.fn(),
            updateProject: jest.fn(),
            syncProjectData: jest.fn(),
            generateProjectWebsite: jest.fn(),
        } as any;
        projectsResolver = new ProjectsResolver(generatorService);
    });

    it('should be defined', () => {
        expect(projectsResolver).toBeDefined();
    });

    it('should call createProject method', () => {
        const user = {
            id: 'k01d29k120d',
            username: 'test user',
        };
        const dto: ProjectCreateDto = {
            notionId: 'n2093j029jf3f',
            notionAccessCode: '02391ed810j99d0d9102jd',
            notionName: 'test project',
        };

        projectsResolver.createProject(user, dto);

        expect(generatorService.createProject).toBeCalledWith(user.id, dto);
    });

    it('should call readProjects method', async () => {
        const user = {
            id: 'k01d29k120d',
            username: 'test user',
        };
        const userProjects = [getProjectDtoStub(user.id)];
        jest.spyOn(generatorService, 'readProjects').mockResolvedValue(userProjects);

        const projects = await projectsResolver.projects(user);

        expect(projects).toEqual(userProjects);
        expect(generatorService.readProjects).toBeCalledWith(user.id);
    });

    it('should call generateProject method', () => {
        const user = {
            id: 'k01d29k120d',
            username: 'test user',
        };
        const projectId = '02k30k93';

        projectsResolver.generateWebsite(user, projectId);

        expect(generatorService.generateProjectWebsite).toHaveBeenCalledWith(user.id, projectId);
    });
});
