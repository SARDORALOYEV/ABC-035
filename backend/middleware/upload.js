const multer = require('multer');

// Fayllarni xotiraga saqlash (Buffer sifatida Supabase'ga yuborish uchun)
const storage = multer.memoryStorage();

// Faqat rasm formatlarini qabul qilish
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Faqat JPG, PNG va WebP formatdagi rasmlar qabul qilinadi'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
