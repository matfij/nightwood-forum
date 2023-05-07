import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthorizedRequest } from '../auth/models/authorized-request';
import { RefreshTokenDto } from '../auth/models/refresh-token.dto';
import { SigninDto } from '../auth/models/signin.dto';
import { SignupDto } from '../auth/models/sigup.dto';
import { AuthGuard } from '../auth/utils/auth.guard';
import { AuthService } from '../auth/service/auth.service';
import { UsersService } from '../users/services/users.service';
import { GeneratorService } from './services/generator.service';

@Controller('api')
export class GatewayController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private generatorService: GeneratorService,
    ) {}

    @Post('/auth/signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('/auth/signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Post('/auth/refreshToken')
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
    async generatorCreateProject(@Body() dto: unknown) {
        return this.generatorService.createProject(dto);
    }

    @Post('/generator/generate')
    @UseGuards(AuthGuard)
    async generatorGenerate(@Body() dto: unknown) {
        return this.generatorService.generate(dto);
    }
}
