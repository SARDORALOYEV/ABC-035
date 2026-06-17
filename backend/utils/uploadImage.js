const { v4: uuidv4 } = require('uuid');
const path = require('path');
const supabase = require('../config/supabase');

/**
 * Rasmni Supabase bucket'ga yuklash
 * @param {Object} file - Multer file obyekti (buffer, originalname, mimetype)
 * @returns {Object} { url, path } - Public URL va bucket ichidagi fayl yo'li
 */
const uploadImage = async (file) => {
  const bucket = process.env.SUPABASE_BUCKET;
  // Noyob fayl nomi: uuid + original kengaytma
  const ext = path.extname(file.originalname).toLowerCase();
  const fileName = `${uuidv4()}${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Rasm yuklashda xato: ${error.message}`);
  }

  // Public URL olish
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return {
    url: data.publicUrl,
    path: fileName,
  };
};

module.exports = uploadImage;
