import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  res.status(200).json({
    limit,
    offset,
    message: 'API V2 - limit - offset',
  });
});

export default router;
