import fs from 'fs';
import { Transform } from 'stream';
import { GenerateParams } from '../models/generate-params';
import { ProjectModel } from '../../projects/models/project-model';
import { NotionClientService } from './notion-client-service';
import { NotionParserService } from './notion-parser-service';
import { WebsiteCompilerService } from './website-compiler-service';

export class GeneratorService {
    static async generateWebsite(params: GenerateParams): Promise<Transform> {
        const project = await ProjectModel.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('project not found');
        }

        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);
        const parsedBlocks = await NotionParserService.parseBlocks(notionBlocks);
        const content = WebsiteCompilerService.compile(parsedBlocks);

        const htmlTemplateStream = fs.createReadStream('src/features/generator/services/templates/index.html');

        return htmlTemplateStream.pipe(
            new Transform({
                transform(chunk, encoding, callback) {
                    const replaceChunk = chunk
                        .toString()
                        .replace('#project-name#', project.notionName)
                        .replace('#project-content#', content);
                    this.push(replaceChunk);
                    callback();
                },
            }),
        );
    }
}
