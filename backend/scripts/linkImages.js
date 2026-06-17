const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'cars-images';

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // 1. Bucketdagi barcha fayllarni olish
  const { data: files, error: listError } = await supabase.storage
    .from(BUCKET)
    .list('', { limit: 500 });

  if (listError) {
    console.error('Fayllarni olishda xatolik:', listError.message);
    return;
  }

  console.log(`\nBucketda ${files.length} ta fayl topildi:`);
  files.forEach(f => console.log('  -', f.name));

  // 2. Bazadagi barcha avtomobillarni olish
  const { data: cars, error: carsError } = await supabase
    .from('cars')
    .select('id, brand, model, year, images');

  if (carsError) {
    console.error('Avtomobillarni olishda xatolik:', carsError.message);
    return;
  }

  console.log(`\nBazada ${cars.length} ta avtomobil topildi:\n`);
  let updatedCount = 0;

  for (const car of cars) {
    const prefix = `${car.brand.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`;

    // Prefix bo'yicha mos keladigan fayllarni topish
    const matchedFiles = files
      .filter(f => f.name.toLowerCase().startsWith(prefix))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (matchedFiles.length === 0) {
      // Eski usulda ham tekshirish (brand model nomi bilan)
      const carKey = `${car.brand} ${car.model}`.toLowerCase();
      const legacyMatch = files.find(f =>
        f.name.toLowerCase().replace(/\.[^.]+$/, '') === carKey
      );
      if (legacyMatch) {
        const { data: urlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(legacyMatch.name);
        const { error: updateError } = await supabase
          .from('cars')
          .update({ images: [{ url: urlData.publicUrl, path: legacyMatch.name }] })
          .eq('id', car.id);
        if (updateError) {
          console.log(`✗ ${car.brand} ${car.model} — yangilashda xatolik:`, updateError.message);
        } else {
          console.log(`✓ ${car.brand} ${car.model} — 1 rasm bog'landi (eski usul): ${legacyMatch.name}`);
          updatedCount++;
        }
      } else {
        console.log(`✗ ${car.brand} ${car.model} — bucketda rasm topilmadi`);
      }
      continue;
    }

    // Har bir fayl uchun public URL va path
    const imageEntries = matchedFiles.map(f => {
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(f.name);
      return { url: urlData.publicUrl, path: f.name };
    });

    const { error: updateError } = await supabase
      .from('cars')
      .update({ images: imageEntries })
      .eq('id', car.id);

    if (updateError) {
      console.log(`✗ ${car.brand} ${car.model} — yangilashda xatolik:`, updateError.message);
    } else {
      console.log(`✓ ${car.brand} ${car.model} — ${imageEntries.length} ta rasm bog'landi`);
      updatedCount++;
    }
  }

  console.log(`\nJami ${updatedCount} ta avtomobilga rasm bog'landi.`);
}

main().catch(console.error);
