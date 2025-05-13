import sequelize from '../db';
import Component from '../models/Component';
import fs from 'fs';

(async () => {
  await sequelize.sync({ force: true });
  const components = JSON.parse(fs.readFileSync('./database/dump.json', 'utf8'));
  for (const item of components) {
    await Component.create(item);
  }
  console.log('Banco populado com sucesso!');
  process.exit();
})();