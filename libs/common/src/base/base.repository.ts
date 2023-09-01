import {
  FilterQuery,
  HydratedDocument,
  Model,
  SortOrder,
  Types,
  UpdateQuery,
} from 'mongoose';
import { BaseSchema } from './base.schema';
import { Logger } from '@nestjs/common';
import { PaginationDto } from './base.dto';

export abstract class BaseRepository<TDocument extends BaseSchema> {
  protected readonly logger = new Logger(BaseRepository.name);

  constructor(protected readonly model: Model<TDocument>) {}

  async create(createDto: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...createDto,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findAll(): Promise<TDocument[]> {
    return this.model.find().exec();
  }

  async getAllWithPagination(
    query: PaginationDto,
    filter: FilterQuery<TDocument>,
    sort?: { [key: string]: SortOrder },
    ...references: string[]
  ): Promise<[HydratedDocument<TDocument>[], number]> {
    const limit = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page : 1;
    const skip = limit * (page - 1);
    delete query.limit;
    delete query.page;

    const queryKeys = Object.keys(query);
    for (let i = 0; i < queryKeys.length; i++) {
      const key = queryKeys[i];
      Object.assign(filter, query[key]);
    }

    const count = await this.model.count(filter);
    const model = (await this.model
      .find(filter)
      .populate(references.join(' '))
      .limit(limit)
      .skip(skip)
      .sort(sort)) as HydratedDocument<TDocument>[];
    return [model, count];
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    ...references: string[]
  ): Promise<TDocument> {
    const document = this.model
      .find(
        filterQuery,
        {},
        {
          lean: true,
        },
      )
      .populate(references.join(' '))
      .exec();
    return document as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    ...references: string[]
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(
        filterQuery,
        {},
        {
          lean: true, // return plain JS object rather than document
        },
      )
      .populate(references.join(' '))
      .exec();

    if (!document) {
      this.logger.warn(
        `No document found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new Error(
        `No document found with filter: ${JSON.stringify(filterQuery)}`,
      );
    }
    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateDto: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    await this.findOne(filterQuery);
    const updatedDocument = await this.model.findOneAndUpdate(
      filterQuery,
      updateDto,
      {
        new: true,
        lean: true,
      },
    );

    return updatedDocument as TDocument;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.findOne(filterQuery);
    await this.model.deleteOne(filterQuery);
    return document;
  }

  async softDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    await this.findOne(filterQuery);
    const now = new Date();
    const update = {
      deletedAt: now,
    };
    const updatedDocument = await this.model.findOneAndUpdate(
      filterQuery,
      update,
      {
        new: true,
        lean: true,
      },
    );
    return updatedDocument as TDocument;
  }
}
