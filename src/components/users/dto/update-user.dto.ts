import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ValidateIf((o) => !o.name && !o.email)
  @IsNotEmpty({ message: 'At least one field (name or email) is required' })
  requiredField: string; // This property is not used, it's just for validation purposes
}
