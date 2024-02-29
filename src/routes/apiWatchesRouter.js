import express from 'express';
import { Watch, Image } from '../../db/models';
import upload from '../utils/upload';

const apiWatchesRouter = express.Router();

apiWatchesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const watch = await Watch.findByPk(id, { include: Image });
    if (!watch) return res.status(404).json('Watch not found');
    res.json(watch.get());
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

apiWatchesRouter.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;
    const { name, description } = req.body;
    if (!name) return res.status(400).json('Name is required');
    if (!description) return res.status(400).json('Description is required');
    const watch = await Watch.create({ name, description });
    const images = await Image.bulkCreate(
      files.map((file) => ({ path: 'uploaded-images/' + file.filename })),
    );
    await watch.addImages(images);
    const newWatch = await Watch.findByPk(watch.id, { include: Image });
    res.json(newWatch.get());
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

apiWatchesRouter.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;
    const { id } = req.params;
    const { name, description } = req.body;
    const watch = await Watch.findByPk(id, { include: Image });
    if (!watch) return res.status(404).json('Watch not found');
    if (!name) return res.status(400).json('Name is required');
    if (!description) return res.status(400).json('Description is required');
    await Promise.all(watch.Images.map((image) => image.destroy()));
    const images = await Image.bulkCreate(
      files.map((file) => ({ path: 'uploaded-images/' + file.filename })),
    );
    Object.assign(watch, { name, description });
    await watch.save();
    await watch.addImages(images);
    const newWatch = await Watch.findByPk(watch.id, { include: Image });
    res.json(newWatch.get());
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

apiWatchesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const watch = await Watch.findByPk(id, { include: Image });
    if (!watch) return res.status(400).json('Watch not found');
    await Promise.all(watch.Images.map((image) => image.destroy()));
    await watch.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

export default apiWatchesRouter;
