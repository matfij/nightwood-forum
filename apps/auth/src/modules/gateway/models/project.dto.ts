import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/modules/users/models/user.dto';

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

    @Field((type) => Int, { nullable: true })
    createdAt?: number;

    @Field((type) => UserDto, { nullable: true })
    user?: UserDto;
}
