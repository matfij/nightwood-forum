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

    @Field((type) => ProjectConfigBlock)
    divider: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    callout: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    listItem: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    todoItem: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    image: ProjectConfigBlock;

    @Field((type) => ProjectConfigBlock)
    file: ProjectConfigBlock;
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

    @Field((type) => ProjectConfigBlockInput)
    divider: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    callout: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    listItem: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    todoItem: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    image: ProjectConfigBlockInput;

    @Field((type) => ProjectConfigBlockInput)
    file: ProjectConfigBlockInput;
}
