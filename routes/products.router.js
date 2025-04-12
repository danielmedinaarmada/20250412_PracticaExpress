import express from 'express';
import ProductsServices from '../services/products.services.js';

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => {
  try {
    const products = await service.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/filter',  (req, res) => {
  res.status(200).send('Ruta esepcifica');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await service.getOne(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send({
      id,
      message: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const product = await service.create(data);
    res.status(201).json({
      product,
      message: 'created products',
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const change = req.body;
    const product = await service.update(id, change);
    res.status(200).json({
      ...product,
      message: 'producto actualizado',
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await service.delete(id);
    res.status(201).json({
      ...product,
      nessage: 'item delete',
    });
  } catch (error) {
    res.status(404).send({
      id,
      message: error.message
    });
  }
});

export default router;
