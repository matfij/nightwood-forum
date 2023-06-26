import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectDto } from '../../gateway/models/project.dto';
import { RemoveFieldMiddleware } from '../../../common/middlewares/remove-field.middleware';

@ObjectType()
export class UserDto {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field({ middleware: [RemoveFieldMiddleware], nullable: true })
    password: string;

    @Field(() => [ProjectDto], { nullable: true })
    projects?: ProjectDto[];
}
