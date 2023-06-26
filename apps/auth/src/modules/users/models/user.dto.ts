import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectDto } from 'src/modules/gateway/models/project.dto';

@ObjectType()
export class UserDto {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => [ProjectDto])
    projects?: ProjectDto[];
}
