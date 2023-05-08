import { Injectable } from '@nestjs/common';
import { CreateProjectParams, Project, GeneratorApi } from '../clients/generator';

@Injectable()
export class GeneratorService {
    generatorApiClient: GeneratorApi;

    constructor() {
        this.generatorApiClient = new GeneratorApi({
            isJsonMime: (mime) => mime === 'application/json',
            basePath: 'http://generator-app:13000',
        });
    }

    async createProject(dto: CreateProjectParams): Promise<Project> {
        const res = await this.generatorApiClient.createProject(dto);
        return res.data;
    }

    async generate(projectId: string): Promise<any> {
        const res = await this.generatorApiClient.website(projectId);
        return res.data;
    }
}
