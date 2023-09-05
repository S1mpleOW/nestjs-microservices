import { BaseRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from '../schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    private reservationModel: Model<UserDocument>,
  ) {
    super(reservationModel);
  }
}
