import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './strategies';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService, LocalSerializer, LocalStrategy],
})
export class AuthModule {}
