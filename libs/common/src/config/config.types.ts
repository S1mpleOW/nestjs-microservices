import { ConfigService } from '@nestjs/config';
import {
  EnvironmentValidatorsForNoSQL,
  // EnvironmentValidatorsForSQL,
} from './env.validate';

export type MyConfigService = typeof ConfigService & {
  get<T extends EnvDatabaseConfigForNoSQL>(key: keyof T): string | undefined;
};

export interface DatabaseConfigForSQL {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  uri: string;
}

export interface DatabaseConfigForNoSQL {
  uri: string;
}

export type DatabaseConfig = DatabaseConfigForSQL | DatabaseConfigForNoSQL;

export type EnvDatabaseConfigForNoSQL = Record<
  keyof EnvironmentValidatorsForNoSQL,
  string | undefined
>;

// type EnvDatabaseConfigForSQL = Record<
//   keyof EnvironmentValidatorsForSQL,
//   string | undefined
// >;
