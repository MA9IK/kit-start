import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class EmailMatchGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    const user = await this.authService.verifyUser(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const providedTokenInBody = request.body.token;
    const userInBody = this.authService.decodeToken(providedTokenInBody);

    const emailInToken = user.email;
    const emailInBody = userInBody.email;

    request.user = user;

    return emailInToken === emailInBody;
  }
}
