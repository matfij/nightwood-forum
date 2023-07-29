import { GeneratorRouter } from '../features/generator/routes/generator-router';
import { DataSyncService } from '../features/data-sync/services/data-sync-service';
import { GeneratorService } from '../features/generator/services/generator-service';
import { MongoProjectRepository } from '../features/projects/data-access/mongo-project-repository';
import { ProjectRepository } from '../features/projects/data-access/project-repository';
import { ProjectsRouter } from '../features/projects/routes/projects-router';
import { ProjectsService } from '../features/projects/services/projects-service';
import { AwsFileUploadService } from './file-upload/aws-file-upload-service';
import { FileUploadService } from './file-upload/file-upload-service';
import { DataSyncRouter } from '../features/data-sync/routes/data-sync-router';

export class DIFactory {
    private projectsRepository: ProjectRepository;
    private projectsService: ProjectsService;
    private projectsRouter: ProjectsRouter;
    private generatorService: GeneratorService;
    private dataSyncService: DataSyncService;
    private generatorRouter: GeneratorRouter;
    private fileUploadService: FileUploadService;
    private dataSyncRouter: DataSyncRouter;

    constructor() {
        this.projectsRepository = new MongoProjectRepository();
        this.projectsService = new ProjectsService(this.projectsRepository);
        this.projectsRouter = new ProjectsRouter(this.projectsService);
        this.dataSyncService = new DataSyncService(this.projectsRepository);
        this.fileUploadService = new AwsFileUploadService();
        this.generatorService = new GeneratorService(
            this.projectsRepository,
            this.dataSyncService,
            this.fileUploadService,
        );
        this.generatorRouter = new GeneratorRouter(this.generatorService);
        this.dataSyncRouter = new DataSyncRouter(this.dataSyncService);
    }

    getProjectsRouter(): ProjectsRouter {
        return this.projectsRouter;
    }

    getGeneratorRouter(): GeneratorRouter {
        return this.generatorRouter;
    }

    getDataSyncRouter(): DataSyncRouter {
        return this.dataSyncRouter;
    }
}
