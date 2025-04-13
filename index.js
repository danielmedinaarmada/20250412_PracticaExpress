import express from 'express';
import routerApi from './routes/index.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/errors.js';
import cors from 'cors';
import boom from '@hapi/boom';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = [
  'http://localhost:3000',
  'http://localhost:8080',
  //'http://127.0.0.1:5500', // como capturar el error con boom
  'https://myapp.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin) {
      console.log("origin", origin);
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }

  },
};

app.use(cors(corsOptions));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Iniciando el proyecto en http://localhost:${port}/`);
});
