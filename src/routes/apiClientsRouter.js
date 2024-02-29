import express from 'express';
import nodemailer from 'nodemailer';
import upload from '../utils/upload';
import { Client, Blueprint } from '../../db/models';
import { verifyAccessToken } from '../middlewares/verifyTokens';

const apiClientRouter = express.Router();

async function sendEmailNotification(email, name) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'vano-elbrus@mail.ru',
      pass: 'Nik789632!',
    },
  });

  const mailOptions = {
    from: 'vano-elbrus@mail.ru',
    to: email,
    subject: 'Уведомление о заказе',
    text: `Здравствуйте, ${name}! Ваш заказ успешно принят.`,
  };

  await transporter.sendMail(mailOptions);
}

apiClientRouter.post('/', upload.array('blueprints'), async (req, res) => {
  try {
    const { files } = req;
    const { name, phone, email } = req.body;

    if (!name) throw new Error('Name is required');
    if (!phone) throw new Error('Phone is required');
    if (!email) throw new Error('Email is required');

    const [client, created] = await Client.findOrCreate({
      where: { email },
      defaults: { name, phone, email },
    });

    const blueprints = await Blueprint.bulkCreate(
      files.map((file) => ({ path: `uploaded-images/${file.filename}` })),
    );
    await client.addBlueprints(blueprints);

    await sendEmailNotification(email, name);

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

apiClientRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const clients = await Client.findAll({ attributes: ['name', 'phone', 'email'] });
    res.json(clients);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

export default apiClientRouter;
