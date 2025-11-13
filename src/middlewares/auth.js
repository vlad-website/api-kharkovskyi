import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export function auth(requiredRole = null) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: { message: 'Unauthorized' } });
    }

    try {
      const payload = jwt.verify(token, config.jwtSecret);
      req.user = payload;

      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: { message: 'Forbidden: insufficient role' } });
      }

      next();
    } catch (e) {
      res.status(401).json({ error: { message: 'Invalid token' } });
    }
  };
}

/* export function auth(required = true) {
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
} */