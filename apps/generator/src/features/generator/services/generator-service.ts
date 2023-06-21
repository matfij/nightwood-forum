import fs from 'fs';
import { Transform } from 'stream';
import { GenerateParams } from '../models/generate-params';
import { WebsiteCompilerService } from './website-compiler-service';
import { DataSyncService } from './data-sync-service';
import { ProjectRepository } from '../../projects/data-access/project-repository';

export class GeneratorService {
    constructor(private projectRepository: ProjectRepository, private dataSyncService: DataSyncService) {}

    async generateWebsite(params: GenerateParams): Promise<Transform> {
        const project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Access denied');
        }
        const projectBlocks = await this.dataSyncService.getSyncedProjectData(params.projectId);
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
