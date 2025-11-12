export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  if (req.app.get('env') !== 'production') {
    console.error(err);
  }
  res.status(status).json({ error: { message, status, details } });
}

export function notFound(req, res, next) {
  res.status(404).json({ error: { message: 'Not Found', status: 404 } });
}