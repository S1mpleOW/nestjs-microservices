import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationRepository } from '../repository/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '1',
    });
  }

  findAll() {
    return this.reservationRepository.findAll();
  }

  findOne(id: number) {
    return this.reservationRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  remove(id: number) {
    return this.reservationRepository.findOneAndDelete({ _id: id });
  }
}
