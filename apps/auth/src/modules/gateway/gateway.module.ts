import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { GeneratorService } from './services/generator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule, AuthModule, UsersModule],
    controllers: [GatewayController],
    providers: [GeneratorService],
})
export class GatewayModule {}
