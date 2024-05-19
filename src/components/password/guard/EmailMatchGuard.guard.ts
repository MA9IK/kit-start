import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class EmailMatchGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Not authorized');

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    const user = await this.authService.decodeToken(token);

    const emailInBody = request.body.email;
    const emailInToken = user.user.email;

    return emailInBody === emailInToken;
  }
}
