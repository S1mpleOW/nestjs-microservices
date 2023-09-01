import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { validate } from './env.validate';
import { database_config } from './mongo.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      cache: true,
      expandVariables: true,
      load: [database_config],
      validate,
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
