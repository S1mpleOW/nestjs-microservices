import { CreateReservationDto } from '../dto/create-reservation.dto';
import { CurrentUser, JWTAuthGuard, UserDto } from '@app/common';
import { ReservationsService } from '../services/reservations.service';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';

@Controller('reservations')
export class ReservationsController {
  private readonly logger = new Logger(ReservationsController.name);

  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    console.log(
      '🚀 ~ ReservationsController ~ create ~ createReservationDto:',
      createReservationDto,
    );
    return this.reservationsService.create(createReservationDto, `${user._id}`);
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
