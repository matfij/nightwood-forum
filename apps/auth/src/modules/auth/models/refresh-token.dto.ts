import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RefreshTokenDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    token: string;
}
