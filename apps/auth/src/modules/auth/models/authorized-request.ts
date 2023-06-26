import { AuthUserDto } from '../../auth/models/auth-user.dto';

export interface AuthorizedRequest {
    user: Omit<AuthUserDto, 'accessToken' | 'refreshToken'>;
}
