const jwt = require('jsonwebtoken');

const cookieName = 'jwt';
const jwtSecret = process.env.JWT_SECRET || 'secret';

/**
 * @param {string} userId
 * @param {import('express').Response} res
 * @description Sets up httpOnly cookie for user with JWT
 */
function setUpJwtCookie(userId, res) {
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '30d',
  });

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    // 1 hour in production, otherwise 30 days if not in production
    maxAge: process.env.NODE_ENV !== 'production' ? 864_000_000 : 3_600_000,
  });
}

function removeJWTCookie(res) {
  res.cookie(cookieName, '', {
    httpOnly: true,
    maxAge: 0,
  });
}

module.exports = { setUpJwtCookie, removeJWTCookie };
