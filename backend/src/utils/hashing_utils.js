const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

async function createHash(strToHash) {
  return await bcrypt.hash(strToHash, salt);
}

function compareWithHashed(str, hashedStr) {
  return bcrypt.compare(str, hashedStr);
}

module.exports = {
  createHash,
  compareWithHashed,
};
