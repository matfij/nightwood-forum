import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from '../models/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../modules/users/services/users.service';
import { SigninDto } from '../models/signin.dto';
import { JWT_ACCESS_TOKEN_EXPIRE_TIME_SECONDS, JWT_REFRESH_TOKEN_EXPIRE_TIME_SECONDS } from '../../../common/config';
import { SignupDto } from '../models/signup.dto';
import { RefreshTokenDto } from '../models/refresh-token.dto';
import { UserDto } from '../../../modules/users/models/user.dto';
import { JwtPayload } from '../models/jwt-payload';
import { AccessTokenDto } from '../models/access-token.dto';
import { ProducerService } from '../../events/services/producer.service';
import { EventTopic } from '../../../.shared/topics';
import { SigninEvent, SignupEvent } from '../../../.shared/events';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private producerService: ProducerService,
        private usersService: UsersService,
    ) {}

    async signup(dto: SignupDto): Promise<AuthUserDto> {
        const user = await this.usersService.readByUsername(dto.username);
        if (user) {
            throw new HttpException('Username must be unique', HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.usersService.create(dto);
        const [accessToken, refeshToken] = await this.generateTokens({ id: newUser.id, username: newUser.username });
        await this.producerService.produce<SignupEvent>({
            topic: EventTopic.Signup,
            data: {
                id: newUser.id,
                username: newUser.username,
            },
        });
        return {
            id: newUser.id,
            username: newUser.username,
            accessToken: accessToken,
            refreshToken: refeshToken,
        };
    }

    async signin(dto: SigninDto): Promise<AuthUserDto> {
        const user = await this.usersService.readByUsername(dto.username);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        if (dto.password !== user.password) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }
        const [accessToken, refeshToken] = await this.generateTokens({ id: user.id, username: user.username });
        await this.producerService.produce<SigninEvent>({
            topic: EventTopic.Signin,
            data: {
                id: user.id,
                username: user.username,
            },
        });
        return {
            id: user.id,
            username: user.username,
            accessToken: accessToken,
            refreshToken: refeshToken,
        };
    }

    async refreshToken(dto: RefreshTokenDto): Promise<AccessTokenDto> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(dto.token);
            const [accessToken] = await this.generateTokens({ id: payload.id, username: payload.username });
            return {
                token: accessToken,
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async me(id: string): Promise<UserDto> {
        const user = await this.usersService.readById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async generateTokens(payload: JwtPayload): Promise<[string, string]> {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME_SECONDS,
        });
        const refeshToken = await this.jwtService.signAsync(
            { ...payload, isRefresh: true },
            {
                expiresIn: JWT_REFRESH_TOKEN_EXPIRE_TIME_SECONDS,
            },
        );
        return [accessToken, refeshToken];
    }
}
