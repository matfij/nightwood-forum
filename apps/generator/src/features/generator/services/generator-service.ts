import fs from 'fs';
import { Transform } from 'stream';
import { GenerateParams } from '../models/generate-params';
import { ProjectModel } from '../../projects/models/project-model';
import { WebsiteCompilerService } from './website-compiler-service';
import { DataSyncService } from './data-sync-service';

export class GeneratorService {
    static async generateWebsite(params: GenerateParams): Promise<Transform> {
        const project = await ProjectModel.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Access denied');
        }
        const projectBlocks = await DataSyncService.getSyncedProjectData(params.projectId);
        const content = WebsiteCompilerService.compile(projectBlocks);
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
