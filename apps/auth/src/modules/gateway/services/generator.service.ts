import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { GENERATOR_APP_URL } from '../../../common/config';
import { ProjectDto } from '../models/project.dto';
import { ProjectCreateDto } from '../models/project-create.dto';

@Injectable()
export class GeneratorService {
    private readonly BASE_URL = GENERATOR_APP_URL;

    async createProject(userId: string, dto: ProjectCreateDto): Promise<ProjectDto> {
        const res = await axios.post(`${this.BASE_URL}/projects/create`, {
            userId: userId,
            ...dto,
        });
        return res.data;
    }

    async readProjects(userId: string): Promise<ProjectDto[]> {
        const res = await axios.post(`${this.BASE_URL}/projects/read`, {
            userId: userId,
        });
        return res.data;
    }

    async generate(projectId: string): Promise<any> {
        const res = await axios.post(`${this.BASE_URL}/generator/website`, {
            projectId: projectId,
        });
        return res;
    }
}
