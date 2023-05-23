import { CreateProjectParams } from '../models/create-project-params';
import { Project, ProjectModel } from '../models/project-model';

export class ProjectsService {
    static async createProject(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await ProjectModel.create(params);
        return projectDoc;
    }
}
