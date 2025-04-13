import express from 'express';
import ProductsServices from '../services/products.services.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/products.schema.js';

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.getAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', (req, res, next) => {
  res.status(200).send('Ruta esepcifica');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.getOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const product = await service.create(data);
      res.status(201).json({
        data: product,
        message: 'created products',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const change = req.body;
      const product = await service.update(id, change);
      res.status(200).json({
        ...product,
        message: 'producto actualizado',
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.delete(id);
    res.status(201).json({
      ...product,
      nessage: 'item delete',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
