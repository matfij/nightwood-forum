import { MongoProjectRepository } from '../features/projects/data-access/mongo-project-repository';
import { ProjectRepository } from '../features/projects/data-access/project-repository';
import { ProjectsRouter } from '../features/projects/routes/projects-router';
import { ProjectsService } from '../features/projects/services/projects-service';

export class DIFactory {
    private projectsRepository: ProjectRepository;
    private projectsService: ProjectsService;
    private projectsRouter: ProjectsRouter;

    constructor() {
        this.projectsRepository = new MongoProjectRepository();
        this.projectsService = new ProjectsService(this.projectsRepository);
        this.projectsRouter = new ProjectsRouter(this.projectsService);
    }

    getProjectsRouter(): ProjectsRouter {
        return this.projectsRouter;
    }
}
