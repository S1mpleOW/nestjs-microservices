import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@app/common/config';
import { ReservationRepository } from './repository/reservation.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './schemas/reservation.schema';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
