import { CreateProjectParams } from '../models/create-project-params';
import { GenerateParams } from '../models/generate-params';
import { Project, ProjectModel } from '../models/project-model';
import { NotionClientService } from './notion-client-service';
import { NotionParserService } from './notion-parser-service';

export class GeneratorService {
    static async createProject(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await ProjectModel.create(params);
        return projectDoc;
    }

    static async generate(params: GenerateParams): Promise<any> {
        const project = await ProjectModel.findOne({ id: params.projectId });
        if (!project) {
            return 'project not found';
        }

        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);

        const parsedBlocks = await NotionParserService.parseBlocks(notionBlocks);

        return parsedBlocks;
    }
}
