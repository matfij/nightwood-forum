import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET } from '../../common/config';
import { AuthGuard } from './utils/auth.guard';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
    imports: [
        UsersModule,
        KafkaModule,
        JwtModule.register({
            secret: JWT_SECRET,
        }),
    ],
    providers: [AuthService, AuthGuard],
    exports: [JwtModule, AuthService, AuthGuard],
})
export class AuthModule {}
