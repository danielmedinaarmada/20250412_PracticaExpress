import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Daniel - proyecto de practica');
});

export default router;
