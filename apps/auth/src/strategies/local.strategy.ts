import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    console.log('🚀 ~ LocalStategy ~ validate ~ password:', password);
    console.log('🚀 ~ LocalStategy ~ validate ~ email:', email);
    try {
      const isMatch = await this.usersService.verifyUser(email, password);
      return isMatch;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
