import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/services/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { JWT_SECRET } from '@app/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request.Authentication || request.cookies.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(data: TokenPayload) {
    console.log('🚀 ~ JwtStrategy ~ validate ~ userId:', data);
    return this.usersService.getUser(data.userId);
  }
}
