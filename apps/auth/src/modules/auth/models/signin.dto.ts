import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SigninDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;
}
