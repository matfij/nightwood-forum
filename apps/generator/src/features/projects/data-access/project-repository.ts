import { CreateProjectParams } from '../models/create-project-params';
import { Project } from '../models/project-model';

export interface ProjectRepository {
    create(params: CreateProjectParams): Promise<Project>;
    findOne(params: Partial<Project>): Promise<Project | null>;
    findMany(params: Partial<Project>): Promise<Project[]>;
    update(projectId: string, params: Partial<Project>): Promise<Project>;
}
