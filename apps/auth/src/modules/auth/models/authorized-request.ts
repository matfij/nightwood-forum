import { AuthUserDto } from 'src/modules/auth/models/auth-user.dto';

export interface AuthorizedRequest {
    user: Omit<AuthUserDto, 'accessToken' | 'refreshToken'>;
}
