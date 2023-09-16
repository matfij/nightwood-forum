import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';
import { ProjectConfig, ProjectConfigInput } from './project-config.dto';

@InputType()
export class ProjectConfigUpdateDto {
    @Field()
    @IsString()
    projectId: string;

    @Field((type) => ProjectConfigInput)
    @IsObject()
    config: ProjectConfigInput;
}
