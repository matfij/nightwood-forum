export interface SigninDto {
    username: string;
    password: string;
}

export interface SignupFormData {
    username: string;
    password: string;
    repeatPassword: string;
}

export interface SignupDto {
    username: string;
    password: string;
}

export interface AuthUserDto {
    id: string;
    username: string;
    accessToken: string;
    refreshToken: string;
}
