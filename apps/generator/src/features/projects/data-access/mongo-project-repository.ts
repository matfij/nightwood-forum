import { CreateProjectParams } from "../models/create-project-params";
import { Project } from "../models/project-model";
import { MongoProjectModel } from "./mongo-project-model";
import { ProjectRepository } from "./project-repository";

export class MongoProjectRepository implements ProjectRepository {
    async create(params: CreateProjectParams): Promise<Project> {
        return await MongoProjectModel.create(params);
    }

    async findOne(params: Partial<Project>): Promise<Project | null> {
        return await MongoProjectModel.findOne(params);
    }
    
    async findMany(params: Partial<Project>): Promise<Project[]> {
        return await MongoProjectModel.find(params);
    }
}