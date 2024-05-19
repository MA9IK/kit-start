import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule, EmailModule, UsersModule],
  controllers: [PasswordController],
  providers: [PasswordService, AuthService],
})
export class PasswordModule {}
