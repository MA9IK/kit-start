import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { SendLinkDto } from './dto/sendLink.dto';
import { PasswordService } from './password.service';
import { EmailMatchGuard } from './guard/EmailMatchGuard.guard';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @UseInterceptors(AuthInterceptor)
  @UseGuards(EmailMatchGuard)
  @Post('reset-password')
  async passwordReset(@Body() data: ResetPasswordDto, @Req() req: any) {
    const user = await this.passwordService.decodeConfirmationToken(data.token);

    await this.passwordService.resetPassword(data, user.email);

    return { success: true };
  }

  @UseGuards(EmailMatchGuard)
  @Post('send-link')
  async sendLink(@Body() data: SendLinkDto) {
    await this.passwordService.sendLink(data);
  }
}
