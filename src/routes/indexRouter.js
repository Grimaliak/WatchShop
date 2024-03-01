import express from 'express';
import { Watch, Image } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const watches = await Watch.findAll({ include: Image });
    res.render('IndexPage', { watches });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.get('/test', async (req, res) => {
  res.render('TestPage');
});

router.get('/admin-login', async (req, res) => {
  res.render('Login');
});

router.get('/admin-logout', async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.redirect("/");
});

export default router;
