const crypto = require('crypto');
 // https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
function tokenGenerator() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = tokenGenerator;