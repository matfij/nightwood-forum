import { IsOptional, IsString } from "class-validator";
import { ProjectConfig } from "./project-config";

export class UpdateProjectParams {
    @IsString()
    projectId!: string;

    @IsString()
    userId!: string;

    @IsString()
    @IsOptional()
    notionId?: string;

    @IsString()
    @IsOptional()
    notionName?: string;

    @IsString()
    @IsOptional()
    notionAccessCode?: string;

    @IsString()
    @IsOptional()
    config?: ProjectConfig;
}
