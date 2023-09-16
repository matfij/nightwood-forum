import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectConfigBlock {
    @Field()
    fontSize: string;

    @Field()
    fontWeight: string;

    @Field()
    margin: string;
}

@InputType()
export class ProjectConfigBlockInput {
    @Field()
    fontSize: string;

    @Field()
    fontWeight: string;

    @Field()
    margin: string;
}
