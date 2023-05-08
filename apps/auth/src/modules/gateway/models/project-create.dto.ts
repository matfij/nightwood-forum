import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectCreateDto {
    @IsString()
    @IsNotEmpty()
    notionId: string;

    @IsString()
    @IsNotEmpty()
    notionName: string;

    @IsString()
    @IsNotEmpty()
    notionAccessCode: string;
}
