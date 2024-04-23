import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class File extends Model {
  public id!: number;
  public description!: string;
  public filename!: string;
  public filepath!: string;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'File',
  }
);

export default File;
