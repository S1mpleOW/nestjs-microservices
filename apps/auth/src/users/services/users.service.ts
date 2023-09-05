import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCurrentUser(createUserDto);
    const password = await this.hashPassword(createUserDto.password);
    return this.userRepository.create({
      ...createUserDto,
      password,
    });
  }

  async validateCurrentUser(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnauthorizedException('User already exists');
  }

  async hashPassword(password: string) {
    const SALT = bcrypt.genSaltSync();
    return await bcrypt.hash(password, SALT);
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const isValidPassword = await this.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  getUser(userId: string) {
    console.log('🚀 ~ UsersService ~ getUser ~ userId:', userId);
    return this.userRepository.findOne({ _id: userId });
  }
}
