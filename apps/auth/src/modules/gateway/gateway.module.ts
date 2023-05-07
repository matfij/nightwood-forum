import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { GeneratorService } from './services/generator.service';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [GatewayController],
    providers: [GeneratorService],
})
export class GatewayModule {}
