import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserDto {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}
