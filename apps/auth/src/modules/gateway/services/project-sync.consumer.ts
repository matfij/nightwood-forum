import axios from 'axios';
import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { GENERATOR_APP_URL, QUEUE_MAX_CONCURRENT_JOBS, QUEUE_SYNC } from '../../../common/config';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';

@Processor(QUEUE_SYNC)
export class ProjectSyncConsumer {
    @Process({ concurrency: QUEUE_MAX_CONCURRENT_JOBS })
    async syncData(job: Job<ProjectSyncJobPayload>) {
        try {
            await axios.post(`${GENERATOR_APP_URL}/dataSync/project`, {
                userId: job.data.userId,
                projectId: job.data.projectId,
            });
        } catch (error) {
            console.log(error);
            await job.moveToFailed(error);
        }
    }
}
