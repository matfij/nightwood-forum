import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectConfigBlock } from './project-config-block.dto';

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
