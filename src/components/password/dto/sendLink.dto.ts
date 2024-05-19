import { IsEmail, IsString } from 'class-validator';

export class SendLinkDto {
  @IsString()
  @IsEmail()
  email: string;
}
