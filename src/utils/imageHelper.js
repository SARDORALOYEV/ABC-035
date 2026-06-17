import { supabase } from '../supabaseClient';

const BUCKET = 'cars-images';

export function getCarImageUrl(imageItem) {
  if (!imageItem) return null;
  if (typeof imageItem === 'string') {
    if (imageItem.startsWith('http://') || imageItem.startsWith('https://')) {
      return imageItem;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(imageItem);
    return data.publicUrl;
  }
  if (imageItem.url) return imageItem.url;
  if (imageItem.path) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(imageItem.path);
    return data.publicUrl;
  }
  return null;
}

export function getFirstCarImage(car) {
  if (!car?.images?.length) return null;
  return getCarImageUrl(car.images[0]);
}

export function resolveCarImages(car) {
  if (!car?.images?.length) return [];
  return car.images.map(getCarImageUrl).filter(Boolean);
}
