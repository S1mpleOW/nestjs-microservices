import { ProcessEnvOptions } from 'child_process';
import { DatabaseConfig, EnvDatabaseConfigForNoSQL } from './config.types';

export const database_config: () => {
  database: DatabaseConfig;
} = () => {
  // const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URI } =
  //   process.env;
  const env: NodeJS.ProcessEnv | EnvDatabaseConfigForNoSQL = process.env;

  const { MONGODB_URI } = env;

  return {
    database: {
      uri: MONGODB_URI,
    },
  };
};
