import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SendLinkDto } from './dto/sendLink.dto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';
import { VerificationTokenPayload } from './verificationTokenPayload.interface';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Injectable()
export class PasswordService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async sendLink(data: SendLinkDto) {
    const user = await this.usersService.findOne({ email: data.email });
    if (!user) throw new NotFoundException();

    const payload: VerificationTokenPayload = { email: data.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
    });

    const url = `${process.env.PASSWORD_RESET_URL}?token=${token}`;
    const text = `Hi there! To reset your password, click here: ${url}`;

    await this.emailService.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password reset',
      text: text,
    });
  }

  async resetPassword(data: ResetPasswordDto, email) {
    if (data.password !== data.repeatPassword) {
      throw new BadRequestException("Password doesn't match");
    }
    await this.usersService.updatePassword(email, {
      password: data.password,
    });
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload;
      }

      throw new BadRequestException();
    } catch (e) {
      console.log(e);
      if (e?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation code');
    }
  }
}
