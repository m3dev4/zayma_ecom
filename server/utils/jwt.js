
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = '15m'; // 15 minutes pour la vérification d'email

export const generateVerificationToken = (userId, email) => {
  return jwt.sign(
    {
      userId,
      email,
      type: 'email-verification'
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}; 