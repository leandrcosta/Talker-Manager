function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
}

function validateWatchedAt(req, res, next) {
  // https://www.regextester.com/99555
  const { talk: { watchedAt } } = req.body;
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!regexData.test(watchedAt)) {
   return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!(([1, 2, 3, 4, 5])).includes(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = {
  validateTalk,
  validateWatchedAt,
  validateRate,
};