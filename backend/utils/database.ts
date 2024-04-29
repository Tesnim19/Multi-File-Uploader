import { Sequelize } from 'sequelize';
import * as path from 'path';
require('dotenv').config();

// Get the directory name of the current module file
let directoryName: string;
if (require.main) {
  directoryName = path.dirname(require.main.filename);
} else {
  // Fallback to the directory of the current file if require.main is undefined
  directoryName = path.dirname(__filename);
}

const env = process.env.NODE_ENV || 'development';
let config;
try {
  config = require(path.join(directoryName, '../', 'config', 'config.js'))[env];
} catch (error) {
  console.error('Error loading config:', error);
  process.exit(1); // Exit the process if config loading fails
}

const username =  process.env.DB_USERNAME|| '';
const   password= process.env.DB_PASSWORD|| '';
const   database= process.env.DB_DATABASE|| '';
const   host= process.env.DB_HOST|| '';
const   dialect= 'mysql' || '';
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();

export default sequelize;
