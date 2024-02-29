import express from 'express';
import upload from '../utils/upload';
import { Client, Blueprint } from '../../db/models';
import { verifyAccessToken } from '../middlewares/verifyTokens';

const apiClientRouter = express.Router();

apiClientRouter.post('/', upload.array('blueprints'), async (req, res) => {
  try {
    const files = req.files;
    const { name, phone, email } = req.body;
    if (!name) throw new Error('Name is required');
    if (!phone) throw new Error('Phone is required');
    if (!email) throw new Error('Email is required');
    const [client, created] = await Client.findOrCreate({
      where: { email },
      include: Blueprint,
      defaults: { name, phone, email },
    });
    if (!created) {
      await Promise.all(client.Blueprints.map((blueprint) => blueprint.destroy()))
    }
    const blueprints = await Blueprint.bulkCreate(
      files.map((file) => ({ path: 'uploaded-images/' + file.filename })),
    );
    await client.addBlueprints(blueprints); // adds blueprints to client
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

apiClientRouter.get('/', verifyAccessToken, async (req, res) => {
  const clients = await Client.findAll({ attributes: ['name', 'phone', 'email'] });
  res.json(clients);
});

export default apiClientRouter;
