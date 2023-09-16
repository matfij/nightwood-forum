import axios from 'axios';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GENERATOR_APP_URL } from '../../../common/config';
import { ProjectDto } from '../models/project.dto';
import { ProjectCreateDto } from '../models/project-create.dto';
import { ProjectSyncJobPayload } from '../models/project-sync-job-payload';
import { ProjectUpdateDto } from '../models/project-update.dto';
import { ProjectSyncProducer } from './project-sync.producer';
import { ProjectConfigUpdateDto } from '../models/project-config-update.dto';

@Injectable()
export class GeneratorService {
    private readonly BASE_URL = GENERATOR_APP_URL;
    private readonly PROJECTS_CACHE_KEY = (userId: string) => `USER_PROJECTS_${userId}`;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private projectSyncProducer: ProjectSyncProducer) {}

    async createProject(userId: string, dto: ProjectCreateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/create`, {
            userId: userId,
            ...dto,
        });
        await this.cacheManager.del(this.PROJECTS_CACHE_KEY(userId));
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
        const cachedProjects = await this.cacheManager.get<ProjectDto[] | null>(this.PROJECTS_CACHE_KEY(userId));
        if (cachedProjects) {
            return cachedProjects;
        }
        const res = await axios.post(`${this.BASE_URL}/projects/readAll`, {
            userId: userId,
        });
        await this.cacheManager.set(this.PROJECTS_CACHE_KEY(userId), res.data);
        return res.data;
    }

    async updateProject(userId: string, dto: ProjectUpdateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/update`, {
            userId: userId,
            ...dto,
        });
        await this.cacheManager.del(this.PROJECTS_CACHE_KEY(userId));
        return res.data;
    }

    async updateProjectConfig(userId: string, dto: ProjectConfigUpdateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/updateConfig`, {
            userId: userId,
            ...dto,
        });
        await this.cacheManager.del(this.PROJECTS_CACHE_KEY(userId));
        return res.data;
    }

    async syncProjectData(userId: string, projectId: string): Promise<string> {
        const payload: ProjectSyncJobPayload = {
            userId: userId,
            projectId: projectId,
        };
        await this.projectSyncProducer.addToQueue(payload);
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
