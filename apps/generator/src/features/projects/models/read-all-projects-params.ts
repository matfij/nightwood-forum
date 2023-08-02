import { IsString } from "class-validator";

export class ReadAllProjectsParams {
    @IsString()
    userId!: string;
}
