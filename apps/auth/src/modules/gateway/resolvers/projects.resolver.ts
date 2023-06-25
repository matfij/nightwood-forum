import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectDto } from '../models/project.dto';
import { GeneratorService } from '../services/generator.service';
import { AuthorizedRequest } from 'src/modules/auth/models/authorized-request';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/utils/auth.guard';

@Resolver(ProjectDto)
export class ProjectsResolver {
    constructor(private generatorService: GeneratorService) {}

    @Query((returns) => ProjectDto)
    @UseGuards(AuthGuard)
    async project(@Req() req: AuthorizedRequest, @Args('id') id: string) {
        return this.generatorService.readProject(req.user.id, id);
    }
}
