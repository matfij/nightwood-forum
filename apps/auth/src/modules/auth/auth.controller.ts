import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { SigninDto } from './models/signin.dto';
import { SignupDto } from './models/sigup.dto';
import { AuthGuard } from 'src/modules/auth/utils/auth.guard';
import { AuthorizedRequest } from 'src/modules/auth/models/authorized-request';
import { RefreshTokenDto } from './models/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('/signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Post('/refreshToken')
    refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    me(@Req() req: AuthorizedRequest) {
        return this.authService.me(req.user.id);
    }
}
