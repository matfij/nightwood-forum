import { Args, Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { StreamableFile, UseGuards } from '@nestjs/common';
import { ProjectDto } from '../models/project.dto';
import { GeneratorService } from '../services/generator.service';
import { AuthGuard } from '../../../common/middlewares/auth.guard';
import { CurrentUser } from '../../../common/utils/current-user.decorator';
import { UserDto } from '../../users/models/user.dto';
import { ProjectCreateDto } from '../models/project-create.dto';

@Resolver()
export class ProjectsResolver {
    constructor(private generatorService: GeneratorService) {}

    @Mutation(() => ProjectDto)
    @UseGuards(AuthGuard)
    createProject(@CurrentUser() user: UserDto, @Args('projectCreateDto') dto: ProjectCreateDto) {
        return this.generatorService.createProject(user.id, dto);
    }

    @Query(() => [ProjectDto])
    @UseGuards(AuthGuard)
    projects(@CurrentUser() user: UserDto) {
        return this.generatorService.readProjects(user.id);
    }

    @Query(() => ProjectDto)
    @UseGuards(AuthGuard)
    project(@CurrentUser() user: UserDto, @Args('id') id: string) {
        return this.generatorService.readProject(user.id, id);
    }

    @Mutation(() => String)
    @UseGuards(AuthGuard)
    sync(@CurrentUser() user: UserDto, @Args('id') id: string) {
        return this.generatorService.syncProjectData(user.id, id);
    }

    @Mutation(() => String)
    @UseGuards(AuthGuard)
    generateWebsite(@CurrentUser() user: UserDto, @Args('id') id: string) {
        return this.generatorService.generateProjectWebsite(user.id, id);
    }
}
