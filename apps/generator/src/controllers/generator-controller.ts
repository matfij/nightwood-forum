import { Route, Tags, Post, OperationId, Controller, Body } from 'tsoa';
import { GeneratorService } from '../services/generator-service';
import { GenerateParams } from '../models/generate-params';
import { CreateProjectParams } from '../models/create-project-params';
import { Project } from '../models/project-model';

@Tags('Generator')
@Route('/generator')
export class GeneratorController extends Controller {
    @Post('/createProject')
    @OperationId('createProject')
    async createProject(@Body() params: CreateProjectParams): Promise<Project> {
        return GeneratorService.createProject(params);
    }

    @Post('/generate')
    @OperationId('generate')
    async generate(@Body() params: GenerateParams): Promise<string> {
        return GeneratorService.generate(params);
    }
}
