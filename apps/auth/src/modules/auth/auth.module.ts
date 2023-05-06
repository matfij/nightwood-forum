import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/config';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: JWT_SECRET,
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
