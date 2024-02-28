import express from 'express';
import { Watch } from '../../db/models'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const watches = await Watch.findAll();
    res.render('IndexPage', { watches });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.get('/admin-login', async (req, res) => {
  res.render('Login');
});

export default router;
