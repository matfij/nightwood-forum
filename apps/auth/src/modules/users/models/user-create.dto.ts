import { IsDefined, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username: string;

    @IsDefined()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}
