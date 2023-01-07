const express = require('express');
const { readTalkers } = require('../utils/readData');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const objectId = talkers.find((talker) => talker.id === Number(id));

  if (objectId) return res.status(200).json(objectId);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;