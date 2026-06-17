const notFound = (req, res, next) => {
  const error = new Error(`Topilmadi - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.code === '23505') {
    return res.status(400).json({
      success: false,
      message: 'Bu ma\'lumot allaqachon tizimda mavjud'
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Bog\'liq bo\'lgan havola xatosi (Kategoriya yoki Mashina topilmadi)'
    });
  }

  if (err.code && err.code.startsWith('22')) {
    return res.status(400).json({
      success: false,
      message: 'Noto\'g\'ri identifikator (ID) formati'
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server ichki xatosi',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
