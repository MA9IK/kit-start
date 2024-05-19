import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    private userService: UsersService,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: 1221212121212,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
    const text = `Hi there! To confirm the email, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      text: text,
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.findOne({ email: email });

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
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

  public async resendConfirmationEmail(userId: string) {
    const user = await this.userService.findOne({ id: userId });
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
