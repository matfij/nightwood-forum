import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserCreateDto } from './models/user-create.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() dto: UserCreateDto) {
        return this.usersService.create(dto);
    }
}
