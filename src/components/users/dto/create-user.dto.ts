import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'EmailService is required' })
  @IsEmail()
  email: string;
  @Length(3, 255)
  password: string;
}
