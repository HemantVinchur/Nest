"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
switch (process.env.NODE_ENV) {
    case 'development':
        exports.dataSourceOptions = {
            type: 'sqlite',
            database: 'db.sqlite',
            synchronize: false,
            entities: ['dist/**/*.entity.js'],
            migrations: ['dist/src/migrations/*.js'],
        };
        break;
    case 'test':
        exports.dataSourceOptions = {
            type: 'sqlite',
            database: 'test.sqlite',
            synchronize: false,
            entities: ['**/*.entity.ts'],
            migrations: ['dist/src/migrations/*.js'],
            migrationsRun: true,
        };
        break;
    case 'production':
        break;
    default:
        throw new Error('Invalid environment variable');
}
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=ormconfig.js.map