import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectConfigBlock {
    @Field()
    fontSize: string;

    @Field()
    fontWeight: string;

    @Field()
    margin: string;
}
