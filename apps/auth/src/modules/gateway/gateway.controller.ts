import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from '../auth/models/authorized-request';
import { RefreshTokenDto } from '../auth/models/refresh-token.dto';
import { SigninDto } from '../auth/models/signin.dto';
import { SignupDto } from '../auth/models/signup.dto';
import { AuthGuard } from '../auth/utils/auth.guard';
import { AuthService } from '../auth/service/auth.service';
import { GeneratorService } from './services/generator.service';
import { ProjectCreateDto } from './models/project-create.dto';
import { HttpStatusCode } from 'axios';

@Controller('api')
@ApiTags('ApiClient')
export class GatewayController {
    constructor(private authService: AuthService, private generatorService: GeneratorService) {}

    @Post('/auth/signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('/auth/signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Post('/auth/refreshToken')
    @HttpCode(HttpStatusCode.Ok)
    refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @Get('/auth/me')
    @UseGuards(AuthGuard)
    me(@Req() req: AuthorizedRequest) {
        return this.authService.me(req.user.id);
    }

    @Post('/generator/projects')
    @UseGuards(AuthGuard)
    generatorCreateProject(@Req() req: AuthorizedRequest, @Body() dto: ProjectCreateDto) {
        return this.generatorService.createProject(req.user.id, dto);
    }

    @Get('/generator/projects')
    @UseGuards(AuthGuard)
    generatorReadProjects(@Req() req: AuthorizedRequest) {
        return this.generatorService.readProjects(req.user.id);
    }

    @Get('/generator/sync/:projectId')
    @UseGuards(AuthGuard)
    generatorSyncProject(@Req() req: AuthorizedRequest, @Param('projectId') projectId: string) {
        return this.generatorService.syncProjectData(req.user.id, projectId);
    }

    @Get('/generator/website/:projectId')
    @UseGuards(AuthGuard)
    generatorWebsite(@Req() req: AuthorizedRequest, @Param('projectId') projectId: string) {
        return this.generatorService.generateProjectWebsite(req.user.id, projectId);
    }
}
