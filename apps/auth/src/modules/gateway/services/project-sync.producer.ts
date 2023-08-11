import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE_MAX_RETRY_COUNT, QUEUE_SYNC } from '../../../common/config';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';

@Injectable()
export class ProjectSyncProducer {
    constructor(@InjectQueue(QUEUE_SYNC) @Inject(QUEUE_SYNC) private syncQueue: Queue) {}

    async addToQueue(payload: ProjectSyncJobPayload): Promise<void> {
        await this.syncQueue.add(payload, { attempts: QUEUE_MAX_RETRY_COUNT });
    }
}
