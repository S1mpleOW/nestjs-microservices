import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserDocument } from '../schemas/User.schema';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userServices.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: UserDocument) {
    return user;
  }
}
