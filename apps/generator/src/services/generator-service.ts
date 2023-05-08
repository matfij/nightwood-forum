import fs from 'fs';
import { Transform } from 'stream';
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

    static async generate(projectId: string): Promise<Transform> {
        const project = await ProjectModel.findOne({ id: projectId });
        if (!project) {
            throw new Error('project not found');
        }

        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);

        const parsedBlocks = await NotionParserService.parseBlocks(notionBlocks);

        const htmlTemplateStream = fs.createReadStream('src/templates/index.html');

        return htmlTemplateStream.pipe(
            new Transform({
                transform(chunk, encoding, callback) {
                    const replaceChunk = chunk
                        .toString()
                        .replace('#project-name#', project.notionName)
                        .replace('#project-content#', `${parsedBlocks}`);
                    this.push(replaceChunk);
                    callback();
                },
            }),
        );
    }
}
