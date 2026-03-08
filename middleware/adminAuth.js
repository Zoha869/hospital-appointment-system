import jwt from 'jsonwebtoken';

// Admin middleware: allow when either
// - valid JWT contains isAdmin:true
// - or when request header 'x-admin-key' matches the configured key
// We provide a default key for development so that admin features work without
// requiring the user to edit .env and restart the server.

const ADMIN_KEY = process.env.ADMIN_KEY || 'zoha123';
if (!process.env.ADMIN_KEY) {
  console.warn('WARNING: ADMIN_KEY not set, defaulting to "zoha123".');
}

const adminAuth = (req, res, next) => {
  try {
    const adminKey = req.header('x-admin-key');
    if (adminKey) {
      if (adminKey === ADMIN_KEY) {
        return next();
      }
      // key was provided but wrong
      return res.status(403).json({ message: 'Invalid admin key' });
    }

    // fallback to checking JWT payload for isAdmin flag
    let token = req.header('Authorization') || '';
    if (token.startsWith('Bearer ')) token = token.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No admin credentials' });

    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
    const payload = jwt.verify(token, secret);
    if (payload?.isAdmin) {
      req.user = payload;
      return next();
    }

    return res.status(403).json({ message: 'Admin access required' });
  } catch (err) {
    console.error('Admin auth error', err);
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

export default adminAuth;
