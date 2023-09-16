import { IsObject, IsString } from 'class-validator';
import { ProjectConfig } from './project-config';

export class UpdateProjectConfigParams {
    @IsString()
    projectId!: string;

    @IsString()
    userId!: string;

    @IsObject()
    config!: Partial<ProjectConfig>;
}
