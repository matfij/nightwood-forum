import { CreateProjectParams } from '../models/create-project-params';
import { GenerateParams } from '../models/generate-params';
import { Project, ProjectModel } from '../models/project-model';

export class GeneratorService {
    static async createProject(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await ProjectModel.create(params);
        return projectDoc;
    }

    static async generate(params: GenerateParams): Promise<string> {
        const project = await ProjectModel.findOne({ id: params.projectId });
        if (!project) {
            return 'project not found';
        }
        return `generated for: "${project.notionName}"`;
    }
}
