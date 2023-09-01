import { BaseRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDocument } from '../schemas/reservation.schema';

@Injectable()
export class ReservationRepository extends BaseRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    private reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
