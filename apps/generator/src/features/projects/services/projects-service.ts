import { CreateProjectParams } from '../models/create-project-params';
import { Project, ProjectModel } from '../models/project-model';
import { ReadProjectsParams } from '../models/read-projects-params';

export class ProjectsService {
    static async createProject(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await ProjectModel.create(params);
        return projectDoc;
    }

    static async readProjects(params: ReadProjectsParams): Promise<Project[]> {
        const projects = await ProjectModel.find({ userId: params.userId });
        return projects;
    }
}
