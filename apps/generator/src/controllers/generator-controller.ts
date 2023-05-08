import express from 'express';
import { Route, Tags, Post, OperationId, Controller, Body, Get, Path, Request, Response } from 'tsoa';
import { GeneratorService } from '../services/generator-service';
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

    @Get('/website/{projectId}')
    @OperationId('website')
    async generate(@Request() request: express.Request, @Path() projectId: string): Promise<void> {
        const response = request.res as express.Response;
        const stream = (await GeneratorService.generate(projectId)).pipe(response);
        await new Promise<void>((resolve, reject) => {
            stream.on('end', () => {
                response.end();
                resolve();
            });
        });
    }
}
