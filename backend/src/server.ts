import express from 'express';
import cors from 'cors';
import sequelize from './db';
import componentRoutes from './routes/components';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/components', componentRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('API rodando em http://localhost:3001'));
});