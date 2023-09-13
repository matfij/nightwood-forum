import { IsOptional, IsString } from 'class-validator';
import { ProjectConfig } from './project-config';

export class Project {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    userId!: string;

    @IsString()
    notionId!: string;

    @IsString()
    notionName!: string;

    @IsString()
    notionAccessCode!: string;

    @IsString()
    config!: ProjectConfig;

    @IsString()
    createdAt!: number;
}
