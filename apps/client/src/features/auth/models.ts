export interface SigninDto {
    username: string;
    password: string;
}

export interface AuthUserDto {
    id: string;
    username: string;
    accessToken: string;
    refreshToken: string;
}
