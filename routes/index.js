import express from 'express';
import defaultRouter from './default.router.js';
import productRouter from './products.router.js';
import userRouter from './users.router.js';
import userRouterV2 from './users.routerV2.js';

function routerApi(app){
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/", defaultRouter);
  router.use("/products", productRouter);
  router.use("/users", userRouter);

  const router2 = express.Router();
  app.use("/api/v2", router2);
  router2.use("/users", userRouterV2);
}


export default routerApi;
