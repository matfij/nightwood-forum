import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ProjectUpdateDto {
    @Field()
    @IsString()
    projectId: string;

    @Field({ nullable: true })
    @IsString()
    notionId: string;

    @Field({ nullable: true })
    @IsString()
    notionName: string;

    @Field({ nullable: true })
    @IsString()
    notionAccessCode: string;
}
