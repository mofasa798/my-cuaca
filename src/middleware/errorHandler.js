export default function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  const message = err.message ?? 'Terjadi kesalahan server';

  res.status(status).json({
    error: message,
  });
}
