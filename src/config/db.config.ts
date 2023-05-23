import { registerAs } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import 'dotenv/config';
export default registerAs('database', (): MysqlConnectionOptions => {
  return {
    type: 'mysql',
    logging: true,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: '/migrations',
    },
  } as MysqlConnectionOptions;
});
