// Very basic demo auth middleware using a static token from env or fallback.
module.exports = function auth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  const expected = process.env.ADMIN_TOKEN || 'demo-admin-token';
  if (token && token === expected) return next();
  return res.status(401).json({ message: 'Unauthorized' });
};
