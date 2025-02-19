const { setUpJwtCookie, removeJWTCookie } = require('../../../utils/jwt_utils');
const hashingUtils = require('../../../utils/hashing_utils');

const users = [];

async function registerUser(req, res) {
  console.log('Register user...');
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Missing properties(s)' });
    return;
  }

  if (users.find((user) => user.email === email)) {
    res.status(409).json({ msg: 'Email is already in use' });
    return;
  }

  const newUser = await createUser(req.body);
  if (!newUser) {
    res.status(400).send();
    return;
  }

  setUpJwtCookie(newUser.id, res);
  res.status(200).json(newUser);
}

async function loginUser(req, res, next) {
  console.log('Login user...');
  try {
    const { email, password } = req.body;
    const user = await getUser(email, password);
    if (!user) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }

    setUpJwtCookie(user.id, res);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

function logoutUser(req, res) {
  console.log('Logout user...');
  removeJWTCookie(res);
  res.status(200).send();
}

async function createUser(user) {
  const { email, name, password } = user;
  if (!email || !name || !password) {
    return false;
  }

  const hashedPw = await hashingUtils.createHash(password);
  const newUser = {
    id: getNextId(),
    email,
    name,
    password: hashedPw,
  };
  users.push(newUser);
  return newUser;
}

function getNextId() {
  if (users.length === 0) return 0;
  return Math.max([...users.map((user) => user.id)]) + 1;
}

async function getUser(email, password) {
  if (users.length < 1) throw new Error('User not found');
  if (!email || !password) return false;

  const user = users.find(
    async (user) =>
      user.email === email &&
      (await hashingUtils.compareWithHashed(password, user.password))
  );
  return user;
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
