import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../components/auth/auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const user = await this.authService.verifyUser(token);
          if (user) {
            const { password, ...rest } = user;
            req.user = rest;
          }
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
      }
    }

    return next.handle().pipe(
      catchError((err) => {
        throw err;
      }),
    );
  }
}
