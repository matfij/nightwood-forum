import { ApiError, ApiErrorName, ApiErrorCode } from '../../src/common/errors/api-error';
import { DataSyncService } from '../../src/features/data-sync/services/data-sync-service';
import { HEADING_BLOCK, PARAGRAPH_BLOCK } from '../stubs/content-blocks';

export const dataSyncServiceMock: Partial<DataSyncService> = {
    getSyncedProjectData: async (projectId: string) => {
        if (projectId === 'NOT_SYNCED') {
            throw new ApiError(ApiErrorName.MissingData, ApiErrorCode.BadRequest, 'Project data not synced', true);
        }
        return [HEADING_BLOCK, PARAGRAPH_BLOCK];
    },
};
