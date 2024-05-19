import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  UseInterceptors,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailConfirmationService: EmailConfirmationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request) {
    return this.authService.login(req);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.register(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(
      createUserDto.email,
    );
    return user;
  }

  @UseInterceptors(AuthInterceptor)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Patch('profile/update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.updateUser(id, updateUserDto); // TODO: change here to rl fn
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.authService.deleteUser(id);
  }
}
