import jwt from 'jsonwebtoken';
import { findUserById } from '../utils/userUtils.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userResult = await findUserById(decoded.userId);

    if (!userResult) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = userResult.user;
    req.userRole = userResult.role;
    req.userCollection = userResult.collection;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth; 