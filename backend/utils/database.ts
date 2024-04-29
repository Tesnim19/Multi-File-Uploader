import { Sequelize } from 'sequelize';
import * as path from 'path';

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

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
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
