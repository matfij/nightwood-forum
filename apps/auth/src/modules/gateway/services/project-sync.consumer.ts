import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { QUEUE_MAX_CONCURRENT_JOBS, QUEUE_NAME_SYNC } from '../../../common/config';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';

@Processor(QUEUE_NAME_SYNC)
export class ProjectSyncConsumer {
    @Process({ concurrency: QUEUE_MAX_CONCURRENT_JOBS })
    async syncData(job: Job<ProjectSyncJobPayload>) {
        console.log('processing:', job.data);
        // await job.moveToCompleted(); // default state
    }
}
