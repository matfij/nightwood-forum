import { Injectable } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../models/user-create.dto';
import { EventPattern } from '@nestjs/microservices';

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

    async readById(id: string): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        return user;
    }

    async readByUsername(username: string): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { username: username } });
        return user;
    }

    @EventPattern('topic-test')
    async test(data: any) {
        console.log(data);
    }
}
