import fs from 'fs';
import { SyncProjectDataParams } from '../models/sync-project-data-params';
import { NotionClientService } from './notion-client-service';
import { NotionParserService } from './notion-parser-service';
import { ContentBlock } from '../models/content-block';
import { ProjectRepository } from '../../projects/data-access/project-repository';

export class DataSyncService {
    PROJECT_CACHE_PATH = (projectId: string) => `.cache/proj_${projectId}.json`;

    constructor(private projectRepository: ProjectRepository) {}

    async syncProjectData(params: SyncProjectDataParams): Promise<void> {
        const project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Access denied');
        }
        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);
        const parsedBlocks = await NotionParserService.parseBlocks(notionBlocks);
        fs.writeFileSync(this.PROJECT_CACHE_PATH(params.projectId), JSON.stringify(parsedBlocks), {
            encoding: 'utf-8',
        });
    }

    async getSyncedProjectData(projectId: string): Promise<ContentBlock[]> {
        if (!fs.existsSync(this.PROJECT_CACHE_PATH(projectId))) {
            throw new Error('Project data not synced');
        }
        const data = fs.readFileSync(this.PROJECT_CACHE_PATH(projectId), { encoding: 'utf-8' });
        const blocks = JSON.parse(data);
        return blocks;
    }
}
