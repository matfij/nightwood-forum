import * as path from 'path';
import { Worker, isMainThread } from 'worker_threads';
import fs from 'fs-extra';
import { SyncProjectDataParams } from '../models/sync-project-data-params';
import { ContentBlock } from '../../generator/models/content-block';
import { ProjectRepository } from '../../projects/data-access/project-repository';
import { PROJECT_CONTENT_PATH } from '../../generator/utils/cache-paths';

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
        if (isMainThread) {
            const workerPath = path.resolve(__dirname, './sync-data-worker.ts');
            const worker = new Worker(workerPath);
            worker.postMessage(project);
            return new Promise((resolve, reject) => {
                worker.on('message', resolve);
                worker.on('error', reject);
            });
        }
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
