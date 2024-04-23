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
const config = require(path.join(directoryName, '../', 'config', 'config.json'))[env];

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
// database.ts

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   host: 'localhost',
//   username: 'your_username',
//   password: 'your_password',
//   database: 'file_uploader', // Your database name
// });

// export default sequelize;

