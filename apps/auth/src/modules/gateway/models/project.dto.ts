import { Field, Float, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../../users/models/user.dto';
import { ProjectConfig } from './project-config.dto';

@ObjectType()
export class ProjectDto {
    @Field()
    id: string;

    @Field()
    userId: string;

    @Field()
    notionId: string;

    @Field()
    notionName: string;

    @Field()
    notionAccessCode: string;

    @Field((type) => ProjectConfig, { nullable: true })
    config?: ProjectConfig;

    @Field((type) => Float, { nullable: true })
    createdAt?: number;

    @Field((type) => UserDto, { nullable: true })
    user?: UserDto;
}
