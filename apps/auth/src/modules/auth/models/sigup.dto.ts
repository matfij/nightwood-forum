import { IsString, MinLength, MaxLength, IsDefined, Matches } from 'class-validator';

export class SignupDto {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username: string;

    @IsDefined()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}
