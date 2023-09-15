import { ProjectRepository } from '../../src/features/projects/data-access/project-repository';
import { ProjectConfigDefault } from '../../src/features/projects/data/project-config-default';
import { CreateProjectParams } from '../../src/features/projects/models/create-project-params';
import { Project } from '../../src/features/projects/models/project-model';

export const mongoProjectRepositoryMock: Partial<ProjectRepository> = {
    async create(params: CreateProjectParams) {
        const project: Project = {
            id: 'p-1',
            createdAt: new Date().getTime(),
            ...params,
            config: ProjectConfigDefault,
        };
        return project;
    },

    async findOne(params: Partial<Project>) {
        if (params.id === 'NOT_HERE') {
            return null;
        }
        const project: Project = {
            id: params.id,
            createdAt: new Date().getTime(),
            userId: params.userId || 'u-1',
            notionId: 'n-1',
            notionAccessCode: 'nac-1',
            notionName: 'Status Anxiety',
            config: ProjectConfigDefault,
        };
        return project;
    },

    async findMany(params: Partial<Project>) {
        const project: Project = {
            id: 'p-1',
            createdAt: new Date().getTime(),
            userId: 'u-1',
            notionId: 'n-1',
            notionAccessCode: 'nac-1',
            notionName: 'Steppenwolf',
            config: ProjectConfigDefault,
        };
        return [project, project];
    },

    async update(projectId: string, params: Partial<Project>) {
        const project: Project = {
            id: projectId,
            createdAt: new Date().getTime(),
            userId: 'u-1',
            notionId: 'n-1',
            notionAccessCode: 'nac-1',
            notionName: 'Stand Alone Complex',
            ...params,
            config: ProjectConfigDefault,
        };
        return project;
    },
};
