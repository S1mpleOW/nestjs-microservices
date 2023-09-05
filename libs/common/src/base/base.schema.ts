import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class BaseSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  _id: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}
