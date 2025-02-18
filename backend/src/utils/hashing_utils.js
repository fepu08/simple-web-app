const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

async function createHash(strToHash) {
  return await bcrypt.hash(strToHash, salt);
}

async function compareWithHashed(str, hashedStr) {
  return await bcrypt.compare(str, hashedStr);
}

module.exports = {
  createHash,
  compareWithHashed,
};
