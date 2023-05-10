import { Injectable } from '@nestjs/common';
import { GeneratorApi } from '../clients/generator';
import { GENERATOR_APP_URL } from '../../../common/config';
import { ProjectDto } from '../models/project.dto';
import { ProjectCreateDto } from '../models/project-create.dto';

@Injectable()
export class GeneratorService {
    generatorApiClient: GeneratorApi;

    constructor() {
        this.generatorApiClient = new GeneratorApi({
            isJsonMime: (mime) => mime === 'application/json',
            basePath: GENERATOR_APP_URL,
        });
    }

    async createProject(userId: string, dto: ProjectCreateDto): Promise<ProjectDto> {
        const res = await this.generatorApiClient.createProject({ userId: userId, ...dto });
        return res.data;
    }

    async generate(projectId: string): Promise<void> {
        const res = await this.generatorApiClient.website(projectId);
        return res.data;
    }
}
