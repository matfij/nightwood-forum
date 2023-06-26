import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, IsDefined, Matches } from 'class-validator';

@InputType()
export class SignupDto {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username: string;

    @Field()
    @IsDefined()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}
