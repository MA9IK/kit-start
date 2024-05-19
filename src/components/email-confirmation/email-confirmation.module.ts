import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [JwtModule, EmailModule, UsersModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, AuthService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
