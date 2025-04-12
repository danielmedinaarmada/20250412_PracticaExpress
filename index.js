import express from 'express';
import routerApi from './routes/index.js';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/errors.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Iniciando el proyecto en http://localhost:${port}/`);
});
