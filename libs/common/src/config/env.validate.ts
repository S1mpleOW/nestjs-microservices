import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentValidators {
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  NODE_ENV: 'development' | 'production';
}

export class EnvironmentValidatorsForAuthModule extends EnvironmentValidators {
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsNumber()
  JWT_EXPIRATION: number;

  @IsNotEmpty()
  @IsString()
  TCP_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  TCP_PORT: number;
}

export class EnvironmentValidatorsForReservationModule extends EnvironmentValidators {}

// export class EnvironmentValidatorsForSQL extends EnvironmentValidators {
//   @IsNotEmpty()
//   @IsString()
//   DB_USERNAME: string;

//   @IsNotEmpty()
//   @IsAlphanumeric()
//   DB_PASSWORD: string | number;

//   @IsNotEmpty()
//   @IsString()
//   DB_HOST: string;

//   @IsNotEmpty()
//   @IsNumber()
//   DB_PORT: number;

//   @IsNotEmpty()
//   @IsString()
//   DB_NAME: string;

//   @IsNotEmpty()
//   @IsString()
//   DB_URI: string;
// }

export class EnvironmentValidatorsForNoSQL extends EnvironmentValidators {
  @IsNotEmpty()
  @IsString()
  MONGODB_URI: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentValidatorsForNoSQL,
    config,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new InternalServerErrorException(errors.toString());
  }

  return validatedConfig;
}
