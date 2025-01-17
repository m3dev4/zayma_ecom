import jwt from 'jsonwebtoken';

const createToken = (res, user) => {
  // Vérifiez que vous utilisez la même clé secrète
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET, // Doit être identique à celle du middleware
    { expiresIn: '30d' }
  );

  // Assurez-vous que vous définissez le cookie avec le même nom
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};

export default createToken;