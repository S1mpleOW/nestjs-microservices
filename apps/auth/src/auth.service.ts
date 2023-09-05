import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from './users/schemas/User.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id,
    };
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
    );

    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
      secret: JWT_SECRET,
    });

    response.cookie('Authentication', token, {
      expires: expires,
      httpOnly: true,
    });
    return token;
  }
  login(user: UserDocument, response: Response) {
    if (!user?._id) {
      return new UnauthorizedException('Credentials are not valid');
    }

    try {
      return this.generateToken(user, response);
    } catch (error) {
      throw error;
    }
  }
}
