const express = require('express');
const { readTalkers } = require('../utils/readData');
const { writeTalkers } = require('../utils/writeData');
const { validateAuthentication } = require('../middlewares/validateAuthentication');
const { validateUserName } = require('../middlewares/validateUserName');
const { validateAge } = require('../middlewares/validateAge');
const { validateTalk, validateWatchedAt, validateRate } = require('../middlewares/validadeTalk');

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

router.post('/',
  validateAuthentication,
  validateUserName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
    const { name, age, talk } = req.body;
    const objectTalks = await readTalkers();
    const newTalker = {
      id: objectTalks.length + 1,
      name,
      age,
      talk,
    };
    objectTalks.push(newTalker);
    await writeTalkers(objectTalks);
    res.status(201).json(newTalker);
  });

  // Put ainda ta faltando dois itens pra passar "12/15"!
  router.put('/:id',
    validateAuthentication,
    validateUserName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate, async (req, res) => {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const objectTalks = await readTalkers();
      const update = {
        id: Number(id),
        name,
        age,
        talk,
      };

      const test = objectTalks.filter((talker) => Number(talker.id) !== Number(id));
      test.push(update);
      await writeTalkers(test);
      return res.status(200).json(update);
    });

    router.delete('/:id', validateAuthentication, async (req, res) => {
      const { id } = req.params;
      const talkers = await readTalkers();
      const filteredArray = talkers.filter((talker) => talker.id !== Number(id));
      await writeTalkers(filteredArray);
      return res.status(204).end();
    });

module.exports = router;