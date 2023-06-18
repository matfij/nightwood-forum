import { SyncProjectDataParams } from '../models/sync-project-data-params';

export class SyncService {
    static async syncProjectData(params: SyncProjectDataParams): Promise<void> {
        console.log('Syncing data for', params.projectId, params.userId);
    }
}
