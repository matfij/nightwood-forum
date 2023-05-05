import { Injectable } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../models/user-create.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDto> {
        const newUser = this.usersRepository.create(dto);
        const savedUser = await this.usersRepository.save(newUser);
        return savedUser;
    }
}
