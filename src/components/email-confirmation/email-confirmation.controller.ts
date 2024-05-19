import { Controller, Post, Body, Req, UseInterceptors } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto } from './confirmEmail.dto';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';

@UseInterceptors(AuthInterceptor)
@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private emailConfirmationService: EmailConfirmationService) {}

  @Post('confirm-email')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
    return { success: true };
  }

  @Post('resend-confirmation')
  async resend(@Req() req: any) {
    await this.emailConfirmationService.resendConfirmationEmail(req.user.id);
    return { success: true };
  }
}
