import express from 'express';
import Component from '../models/Component';

const router = express.Router();

router.get('/:category', async (req, res) => {
  const components = await Component.findAll({
    where: { category: req.params.category.toLowerCase() }
  });
  res.json(components);
});

router.post('/', async (req, res) => {
  try {
    const component = await Component.create(req.body);
    res.json(component);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;