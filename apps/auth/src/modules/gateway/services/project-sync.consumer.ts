import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { GENERATOR_APP_URL, QUEUE_MAX_CONCURRENT_JOBS, QUEUE_NAME_SYNC } from '../../../common/config';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';
import axios from 'axios';

@Processor(QUEUE_NAME_SYNC)
export class ProjectSyncConsumer {
    @Process({ concurrency: QUEUE_MAX_CONCURRENT_JOBS })
    async syncData(job: Job<ProjectSyncJobPayload>) {
        try {
            await axios.post(`${GENERATOR_APP_URL}/generator/sync`, {
                userId: job.data.userId,
                projectId: job.data.projectId,
            });
        } catch (error) {
            await job.moveToFailed(error);
        }
    }
}
