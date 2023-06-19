import { CreateProjectParams } from "../models/create-project-params";
import { Project } from "../models/project-model";

export interface ProjectRepository {
    create(params: CreateProjectParams): Promise<Project>;
    findMany(params: Partial<Project>): Promise<Project[]>;
}