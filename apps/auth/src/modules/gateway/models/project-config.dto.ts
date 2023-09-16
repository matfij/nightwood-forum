import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ProjectConfigBlock, ProjectConfigBlockInput } from './project-config-block.dto';

@ObjectType()
export class ProjectConfig {
    @Field()
    fontUrl: string;

    @Field()
    fontColor: string;

    @Field()
    fontFamily: string;

    @Field()
    backgroundColor: string;

    @Field((type) => ProjectConfigBlock)
    heading: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    paragraph: ProjectConfigBlock;
}

@InputType()
export class ProjectConfigInput {
    @Field()
    fontUrl: string;

    @Field()
    fontColor: string;

    @Field()
    fontFamily: string;

    @Field()
    backgroundColor: string;

    @Field((type) => ProjectConfigBlockInput)
    heading: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    paragraph: ProjectConfigBlockInput;
}
