import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import sellPointsRouter from './src/routes/sellPoints';

const app = express();
app.config = config;
app.datasource = datasource();
app.set('port', process.env.app_port);
app.use(bodyParser.json());

sellPointsRouter(app);

export default app;
