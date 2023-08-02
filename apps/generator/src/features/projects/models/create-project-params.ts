import { IsString } from "class-validator";

export class CreateProjectParams {
    @IsString()
    userId!: string;

    @IsString()
    notionId!: string;

    @IsString()
    notionName!: string;

    @IsString()
    notionAccessCode!: string;
}
