import { Route, Tags, Post, OperationId, Controller, Body } from 'tsoa';
import { GeneratorService } from '../services/generator-service';
import { GenerateParams } from '../models/generate-params';

@Tags('Generator')
@Route('/generator')
export class GeneratorController extends Controller {
    @Post()
    @OperationId('generate')
    async generate(@Body() params: GenerateParams): Promise<string> {
        return GeneratorService.generate(params);
    }
}
