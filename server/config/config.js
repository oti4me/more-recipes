const dotenv = require('dotenv');

dotenv.config();

const config = {
  "development": {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": 'postgres',
    "logging": false
  },
  test: {
    use_env_variable: 'ELEPHANT_TEST'
    // "username": process.env.TEST_DB_USERNAME,
    // "password": process.env.TEST_DB_PASSWORD,
    // "database": process.env.TEST_DB_NAME,
    // "host": process.env.TEST_DB_HOST,
    // "dialect": 'postgres',
    // "logging": false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;
