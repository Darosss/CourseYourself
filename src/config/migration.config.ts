import 'dotenv/config';
import * as path from 'path';
import { DataSource } from 'typeorm';
import dbConfig from './db.config';
const config = new DataSource({
  ...dbConfig(),
  entities: [path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)],
  migrations: [path.resolve(`${__dirname}/../migrations/*{.ts,.js}`)],
});
export default config;
