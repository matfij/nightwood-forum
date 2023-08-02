import { IsString } from 'class-validator';

export class ReadOneProjectParams {
    @IsString()
    projectId!: string;

    @IsString()
    userId!: string;
}
