function validationEmail(req, res, next) {
  // https://pt.stackoverflow.com/questions138express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

module.exports = { validationEmail };