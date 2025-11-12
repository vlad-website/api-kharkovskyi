import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      if (!required) return next();
      return res.status(401).json({ error: { message: 'Unauthorized', status: 401 } });
    }

    try {
      const payload = jwt.verify(token, config.jwtSecret);
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: { message: 'Invalid token', status: 401 } });
    }
  };
}