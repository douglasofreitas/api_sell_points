import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from './config';

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../src/models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

export default() => {
  if (!database) {
    console.log('process.env', process.env);
    const sequelize = new Sequelize(
      process.env.database || config.database || 'sell_point',
      process.env.database_user || config.database_user || 'root',
      process.env.database_password || config.database_password || 'pwd',
      {
        dialect: config.params.dialect || 'postgres',
        host: process.env.database_host || config.params.host,
      },
    );
    database = {
      sequelize,
      Sequelize,
      models: {},
    };
    database.models = loadModels(sequelize);
    sequelize.sync({ }).done(() => database);
  }
  return database;
};
