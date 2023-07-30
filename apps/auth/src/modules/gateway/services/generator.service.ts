import axios from 'axios';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GENERATOR_APP_URL, QUEUE_MAX_RETRY_COUNT, QUEUE_NAME_SYNC } from '../../../common/config';
import { ProjectDto } from '../models/project.dto';
import { ProjectCreateDto } from '../models/project-create.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';
import { ProjectUpdateDto } from '../models/project-update.dto';

@Injectable()
export class GeneratorService {
    private readonly BASE_URL = GENERATOR_APP_URL;
    private readonly PROJECTS_KEY = (userId: string) => `USER_PROJECTS_${userId}`;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectQueue(QUEUE_NAME_SYNC) private syncQueue: Queue,
    ) {}

    async createProject(userId: string, dto: ProjectCreateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/create`, {
            userId: userId,
            ...dto,
        });
        await this.cacheManager.del(this.PROJECTS_KEY(userId));
        return res.data;
    }

    async readProject(userId: string, projectId: string): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/readOne`, {
            userId: userId,
            projectId: projectId,
        });
        return res.data;
    }

    async readProjects(userId: string): Promise<ProjectDto[]> {
        const cachedProjects = await this.cacheManager.get<ProjectDto[] | null>(this.PROJECTS_KEY(userId));
        if (cachedProjects) {
            return cachedProjects;
        }
        const res = await axios.post(`${this.BASE_URL}/projects/readAll`, {
            userId: userId,
        });
        await this.cacheManager.set(this.PROJECTS_KEY(userId), res.data);
        return res.data;
    }

    async updateProject(userId: string, dto: ProjectUpdateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/update`, {
            userId: userId,
            ...dto,
        });
        return res.data;
    }

    async syncProjectData(userId: string, projectId: string): Promise<string> {
        const payload: ProjectSyncJobPayload = {
            userId: userId,
            projectId: projectId,
        };
        await this.syncQueue.add(payload, { attempts: QUEUE_MAX_RETRY_COUNT });
        return projectId;
    }

    async generateProjectWebsite(userId: string, projectId: string): Promise<string> {
        const res = await axios.post(`${this.BASE_URL}/generator/website`, {
            userId: userId,
            projectId: projectId,
        });
        return res.data;
    }
}
