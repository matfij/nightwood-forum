import { GeneratorRouter } from '../features/generator/routes/generator-router';
import { DataSyncService } from '../features/generator/services/data-sync-service';
import { GeneratorService } from '../features/generator/services/generator-service';
import { MongoProjectRepository } from '../features/projects/data-access/mongo-project-repository';
import { ProjectRepository } from '../features/projects/data-access/project-repository';
import { ProjectsRouter } from '../features/projects/routes/projects-router';
import { ProjectsService } from '../features/projects/services/projects-service';

export class DIFactory {
    private projectsRepository: ProjectRepository;
    private projectsService: ProjectsService;
    private projectsRouter: ProjectsRouter;
    private generatorService: GeneratorService;
    private dataSyncService: DataSyncService;
    private generatorRouter: GeneratorRouter;

    constructor() {
        this.projectsRepository = new MongoProjectRepository();
        this.projectsService = new ProjectsService(this.projectsRepository);
        this.projectsRouter = new ProjectsRouter(this.projectsService);
        this.dataSyncService = new DataSyncService(this.projectsRepository);
        this.generatorService = new GeneratorService(this.projectsRepository, this.dataSyncService);
        this.generatorRouter = new GeneratorRouter(this.dataSyncService, this.generatorService);
    }

    getProjectsRouter(): ProjectsRouter {
        return this.projectsRouter;
    }

    getGeneratorRouter(): GeneratorRouter {
        return this.generatorRouter;
    }
}
