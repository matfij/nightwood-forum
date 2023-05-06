import { Body, Controller, HttpException, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserCreateDto } from './models/user-create.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() dto: UserCreateDto) {
        try {
            return await this.usersService.create(dto);
        } catch (error) {
            throw new HttpException('users-create failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
