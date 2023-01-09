const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');
const { validationEmail } = require('../middlewares/validateEmail');
const { validationPassword } = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validationEmail, validationPassword, (_req, res) => {
  const token = tokenGenerator();
  if (token) {
    return res.status(200).json({ token });
  }
});

module.exports = router;