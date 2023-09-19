import { CreateProjectParams } from '../models/create-project-params';
import { Project } from '../models/project-model';
import { MongoProjectModel } from './mongo-project-model';
import { ProjectRepository } from './project-repository';

export class MongoProjectRepository implements ProjectRepository {
    async create(params: CreateProjectParams): Promise<Project> {
        const project = await MongoProjectModel.create(params);
        return project.toObject();
    }

    async findOne(params: Partial<Project>): Promise<Project | null> {
        const project = await MongoProjectModel.findOne(params);
        return project?.toObject() || null;
    }

    async findMany(params: Partial<Project>): Promise<Project[]> {
        const projects = await MongoProjectModel.find(params);
        return projects.map((x) => x.toObject());
    }

    async update(projectId: string, params: Partial<Project>): Promise<Project> {
        const project = await MongoProjectModel.findOneAndUpdate({ id: projectId }, { $set: params }, { new: true });
        return project!.toObject();
    }
}
