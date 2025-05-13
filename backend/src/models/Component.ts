import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Component extends Model {}

Component.init({
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
  socket: DataTypes.STRING,
  socket_compatível: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Component'
});

export default Component;