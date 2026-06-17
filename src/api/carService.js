import { supabase } from '../supabaseClient';

const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Xatolik yuz berdi');
  return data;
}

export async function uploadCarImage(file, brand, model, year) {
  const timestamp = Date.now();
  const fileName = `${brand.toLowerCase()}-${model.toLowerCase()}-${year}-${timestamp}.webp`.replace(/\s+/g, '-');

  const { data, error } = await supabase.storage
    .from('cars-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/webp',
    });

  if (error) throw new Error(`Rasm yuklashda xatolik: ${error.message}`);

  const { data: urlData } = supabase.storage
    .from('cars-images')
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl, path: fileName };
}

export async function addCar(carData) {
  const res = await apiRequest('/cars', {
    method: 'POST',
    body: carData,
  });
  return res.data;
}

export async function updateCar(id, carData) {
  const res = await apiRequest(`/cars/${id}`, {
    method: 'PUT',
    body: carData,
  });
  return res.data;
}

export async function fetchCategories() {
  const res = await apiRequest('/categories');
  return (res.data || []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));
}

const fuelTypes = ['benzin', 'dizel', 'gaz', 'elektr', 'gibrid'];
const transmissions = ['mexanika', 'avtomat', 'yarim-avtomat'];
const bodyTypes = ['sedan', 'suv', 'hatchback', 'minivan', 'pikap', 'kupe', 'kabriolet', 'universal', 'boshqa'];

export const formOptions = { fuelTypes, transmissions, bodyTypes };
