import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenDto {
    @Field()
    token: string;
}
