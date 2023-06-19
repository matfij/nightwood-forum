import { ProjectRepository } from '../data-access/project-repository';
import { CreateProjectParams } from '../models/create-project-params';
import { Project } from '../models/project-model';
import { ReadProjectsParams } from '../models/read-projects-params';

export class ProjectsService {
    constructor(private projectRepository: ProjectRepository) {}

    async createProject(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await this.projectRepository.create(params);
        return projectDoc;
    }

    async readProjects(params: ReadProjectsParams): Promise<Project[]> {
        const projects = await this.projectRepository.findMany({ userId: params.userId });
        return projects;
    }
}
