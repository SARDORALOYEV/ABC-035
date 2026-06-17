const supabase = require('../config/supabase');

/**
 * Supabase bucket'dan rasmni o'chirish
 * @param {string} filePath - Bucket ichidagi fayl nomi (path)
 */
const deleteImage = async (filePath) => {
  if (!filePath) return;

  const bucket = process.env.SUPABASE_BUCKET;
  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    // O'chirish xatosi critical emas, faqat log qilamiz
    console.error(`Rasmni o'chirishda xato: ${error.message}`);
  }
};

module.exports = deleteImage;
