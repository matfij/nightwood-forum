import { IsOptional, IsString } from 'class-validator';

export class Project {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    userId!: string;

    @IsString()
    notionId!: string;

    @IsString()
    notionName!: string;

    @IsString()
    notionAccessCode!: string;

    @IsString()
    createdAt!: number;
}
