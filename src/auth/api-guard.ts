import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Token is required');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token format is invalid');
    }

    const validToken = this.configService.get<string>('API_TOKEN');
    if (token !== validToken) {
      throw new UnauthorizedException('Token invalid');
    }

    return true;
  }
}
