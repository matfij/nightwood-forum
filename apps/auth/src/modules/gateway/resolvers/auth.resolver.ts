import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenDto } from '../../auth/models/access-token.dto';
import { AuthUserDto } from '../../auth/models/auth-user.dto';
import { RefreshTokenDto } from '../../auth/models/refresh-token.dto';
import { SigninDto } from '../../auth/models/signin.dto';
import { SignupDto } from '../../auth/models/signup.dto';
import { AuthService } from '../../auth/service/auth.service';
import { AuthGuard } from '../../../common/middlewares/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../../common/utils/current-user.decorator';
import { UserDto } from '../../users/models/user.dto';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => AuthUserDto)
    signup(@Args('signupDto') dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Mutation(() => AuthUserDto)
    signin(@Args('signinDto') dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Mutation(() => AccessTokenDto)
    refreshToken(@Args('refreshTokenDto') dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @Query(() => UserDto)
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: UserDto) {
        return this.authService.me(user.id);
    }
}
