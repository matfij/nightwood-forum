import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserCreateDto } from './models/user-create.dto';
import { HttpExceptionFilter } from 'src/common/utils/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() dto: UserCreateDto) {
        return await this.usersService.create(dto);
    }
}
