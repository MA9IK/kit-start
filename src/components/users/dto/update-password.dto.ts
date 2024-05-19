import { IsOptional, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsOptional()
  @Length(3, 255)
  password: string;
}
