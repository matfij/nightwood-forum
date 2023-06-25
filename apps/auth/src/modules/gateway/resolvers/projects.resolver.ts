import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectDto } from '../models/project.dto';
import { GeneratorService } from '../services/generator.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../common/middlewares/auth.guard';
import { CurrentUser } from 'src/common/utils/current-user.decorator';
import { UserDto } from 'src/modules/users/models/user.dto';

@Resolver(ProjectDto)
export class ProjectsResolver {
    constructor(private generatorService: GeneratorService) {}

    @Query(() => ProjectDto)
    @UseGuards(AuthGuard)
    async project(@CurrentUser() user: UserDto, @Args('id') id: string) {
        return this.generatorService.readProject(user.id, id);
    }
}
