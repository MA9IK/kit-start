import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(3, 255)
  password: string;

  @IsString()
  @Length(3, 255)
  repeatPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
