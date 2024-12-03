import { DataSource, DataSourceOptions } from 'typeorm';

export let dataSourceOptions: DataSourceOptions;
switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
    };
    break;
  case 'test':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'test.sqlite',
      synchronize: false,
      entities: ['**/*.entity.ts'], // Use ts entity files for testing because in test environment we don't have compiled js files
      migrations: ['dist/src/migrations/*.js'],
      migrationsRun: true,
    };
    break;
  case 'production':
    dataSourceOptions = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    break;
  default:
    throw new Error('Invalid environment variable');
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
