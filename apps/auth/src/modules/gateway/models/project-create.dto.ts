import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ProjectCreateDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    notionId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    notionName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    notionAccessCode: string;
}
