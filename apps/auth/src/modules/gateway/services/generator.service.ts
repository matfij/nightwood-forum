import axios from 'axios';
import { Cache } from 'cache-manager';
import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GENERATOR_APP_URL } from '../../../common/config';
import { ProjectDto } from '../models/project.dto';
import { ProjectCreateDto } from '../models/project-create.dto';

@Injectable()
export class GeneratorService {
    private readonly BASE_URL = GENERATOR_APP_URL;
    private readonly PROJECTS_KEY = (userId: string) => `USER_PROJECTS_${userId}`;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createProject(userId: string, dto: ProjectCreateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/create`, {
            userId: userId,
            ...dto,
        });
        await this.cacheManager.del(this.PROJECTS_KEY(userId));
        return res.data;
    }

    async readProjects(userId: string): Promise<ProjectDto[]> {
        const cachedProjects = await this.cacheManager.get<ProjectDto[] | null>(this.PROJECTS_KEY(userId));
        if (cachedProjects) {
            return cachedProjects;
        }
        console.log('valling api');
        const res = await axios.post(`${this.BASE_URL}/projects/read`, {
            userId: userId,
        });
        await this.cacheManager.set(this.PROJECTS_KEY(userId), res.data);
        return res.data;
    }

    async generate(projectId: string): Promise<StreamableFile> {
        const res = await axios.post(`${this.BASE_URL}/generator/website`, {
            projectId: projectId,
        });
        return new StreamableFile(Buffer.from(res.data));
    }
}
