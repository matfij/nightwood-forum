import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectDto } from '../models/project.dto';
import { GeneratorService } from '../services/generator.service';
import { AuthGuard } from '../../../common/middlewares/auth.guard';
import { CurrentUser } from '../../../common/utils/current-user.decorator';
import { UserDto } from '../../users/models/user.dto';

@Resolver()
export class ProjectsResolver {
    constructor(private generatorService: GeneratorService) {}

    @Query(() => ProjectDto)
    @UseGuards(AuthGuard)
    async project(@CurrentUser() user: UserDto, @Args('id') id: string) {
        return this.generatorService.readProject(user.id, id);
    }
}
