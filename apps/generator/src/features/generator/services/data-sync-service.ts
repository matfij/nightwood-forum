import fs from 'fs';
import { SyncProjectDataParams } from '../models/sync-project-data-params';
import { NotionClientService } from './notion-client-service';
import { NotionParserService } from './notion-parser-service';
import { ContentBlock } from '../models/content-block';
import { ProjectRepository } from '../../projects/data-access/project-repository';
import { PROJECT_ASSETS_PATH, PROJECT_CACHE_PATH, PROJECT_CONTENT_PATH } from '../utils/cache-paths';

export class DataSyncService {
    constructor(private projectRepository: ProjectRepository) {}

    async syncProjectData(params: SyncProjectDataParams): Promise<void> {
        const project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project || !project.id) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Access denied');
        }
        if (!fs.existsSync(PROJECT_CACHE_PATH(project.id))) {
            fs.mkdirSync(PROJECT_CACHE_PATH(project.id));
        }
        if (!fs.existsSync(PROJECT_ASSETS_PATH(project.id))) {
            fs.mkdirSync(PROJECT_ASSETS_PATH(project.id));
        }
        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);
        const parsedBlocks = await NotionParserService.parseBlocks(project.id, notionBlocks);
        fs.writeFileSync(PROJECT_CONTENT_PATH(project.id), JSON.stringify(parsedBlocks), {
            encoding: 'utf-8',
        });
    }

    async getSyncedProjectData(projectId: string): Promise<ContentBlock[]> {
        if (!fs.existsSync(PROJECT_CONTENT_PATH(projectId))) {
            throw new Error('Project data not synced');
        }
        const data = fs.readFileSync(PROJECT_CONTENT_PATH(projectId), { encoding: 'utf-8' });
        const blocks = JSON.parse(data);
        return blocks;
    }
}
