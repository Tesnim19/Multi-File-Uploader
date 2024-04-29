import express from 'express';
import sequelize from './utils/database';
import File from './models/FileModel';
import fileRoutes from './routes/File.routes'
import path from 'path';
const cors = require('cors');

const app = express();
app.use(cors({ origin: "*" }));
app.use('/api', fileRoutes);
app.use('/uploads', express.static('uploads'));



sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized successfully.');
}).catch(error => {
  console.error('Error synchronizing database:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
