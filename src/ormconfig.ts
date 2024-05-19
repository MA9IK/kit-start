import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

type DatabaseType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'sap'
  | 'oracle'
  | 'cordova'
  | 'nativescript'
  | 'react-native'
  | 'sqljs'
  | 'mongodb'
  | 'aurora-mysql'
  | 'aurora-postgres'
  | 'expo'
  | 'better-sqlite3'
  | 'capacitor'
  | 'spanner';

const DATABASE_TYPE = process.env.DATABASE_TYPE as DatabaseType;

if (!DATABASE_TYPE) {
  throw new Error(
    'DATABASE_TYPE environment variable is not set or is invalid',
  );
}

export const dataSourceOptions = {
  type: DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/**/*.{js,ts}'],
  subscribers: [__dirname + '/subscriber/**/*.{js,ts}'],
} as DataSourceOptions;
