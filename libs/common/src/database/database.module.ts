import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { options } from '../config/orm.config';
import { MyConfigService } from '../config/config.types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: MyConfigService) => options(configService),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
