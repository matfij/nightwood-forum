import { GenerateParams } from '../models/generate-params';

export class GeneratorService {
    static async generate(params: GenerateParams): Promise<string> {
        return `generated for: ${params.projectId}`;
    }
}
