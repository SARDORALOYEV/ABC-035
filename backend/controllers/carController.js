const { supabase } = require('../config/db');
const uploadImage = require('../utils/uploadImage');
const deleteImage = require('../utils/deleteImage');

const mapCarRow = (row) => ({
  id: row.id,
  title: row.title,
  brand: row.brand,
  model: row.model,
  year: row.year,
  price: row.price,
  currency: row.currency,
  mileage: row.mileage,
  fuelType: row.fuel_type,
  transmission: row.transmission,
  bodyType: row.body_type,
  driveType: row.drive_type,
  engineVolume: row.engine_volume,
  horsePower: row.horse_power,
  color: row.color,
  condition: row.condition,
  description: row.description,
  images: row.images,
  category: row.category ? { id: row.category.id, name: row.category.name, slug: row.category.slug } : null,
  category_id: row.category_id,
  isAvailable: row.is_available,
  isFeatured: row.is_featured,
  views: row.views,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getCars = async (req, res, next) => {
  try {
    const {
      brand, category, minPrice, maxPrice, search, fuelType,
      transmission, bodyType, condition, year, page = 1, limit = 12,
      sort: sortParam = '-createdAt',
    } = req.query;

    let query = supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)', { count: 'exact' });

    if (brand) query = query.ilike('brand', `%${brand}%`);
    if (category) query = query.eq('category_id', category);
    if (fuelType) query = query.eq('fuel_type', fuelType);
    if (transmission) query = query.eq('transmission', transmission);
    if (bodyType) query = query.eq('body_type', bodyType);
    if (condition) query = query.eq('condition', condition);
    if (year) query = query.eq('year', Number(year));
    if (minPrice) query = query.gte('price', Number(minPrice));
    if (maxPrice) query = query.lte('price', Number(maxPrice));

    if (search) {
      query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`);
    }

    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? { ascending: false } : { ascending: true };
    const sortMap = { createdAt: 'created_at', price: 'price', year: 'year', views: 'views', brand: 'brand' };
    query = query.order(sortMap[sortField] || 'created_at', sortOrder);

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      data: data.map(mapCarRow),
    });
  } catch (error) {
    next(error);
  }
};

const getFeaturedCars = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)')
      .eq('is_featured', true)
      .eq('is_available', true)
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) throw error;

    res.json({ success: true, count: data.length, data: data.map(mapCarRow) });
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { data: car, error } = await supabase
      .from('cars')
      .select('*, category:category_id(id, name, slug)')
      .eq('id', req.params.id)
      .single();

    if (error || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    const { error: updateError } = await supabase
      .from('cars')
      .update({ views: car.views + 1 })
      .eq('id', req.params.id);

    if (updateError) throw updateError;

    car.views += 1;

    res.json({ success: true, data: mapCarRow(car) });
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = await Promise.all(req.files.map((file) => uploadImage(file)));
    } else if (req.body.images && Array.isArray(req.body.images)) {
      images = req.body.images;
    }

    const carData = {
      title: req.body.title,
      brand: req.body.brand,
      model: req.body.model,
      year: Number(req.body.year),
      price: Number(req.body.price),
      currency: req.body.currency || 'USD',
      mileage: req.body.mileage ? Number(req.body.mileage) : 0,
      fuel_type: req.body.fuelType,
      transmission: req.body.transmission,
      body_type: req.body.bodyType,
      drive_type: req.body.driveType || 'old',
      engine_volume: req.body.engineVolume ? Number(req.body.engineVolume) : null,
      horse_power: req.body.horsePower ? Number(req.body.horsePower) : null,
      color: req.body.color || '',
      condition: req.body.condition || 'ishlatilgan',
      description: req.body.description || '',
      images: images,
      category_id: req.body.category,
      is_available: req.body.isAvailable !== undefined ? req.body.isAvailable : true,
      is_featured: req.body.isFeatured !== undefined ? req.body.isFeatured : false,
    };

    const { data, error } = await supabase
      .from('cars')
      .insert(carData)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: mapCarRow(data) });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    let images = existing.images || [];
    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(req.files.map((file) => uploadImage(file)));
      images = [...images, ...newImages];
    }

    const updateData = {};
    const fieldMap = {
      title: 'title', brand: 'brand', model: 'model', year: 'year',
      price: 'price', currency: 'currency', mileage: 'mileage',
      fuelType: 'fuel_type', transmission: 'transmission', bodyType: 'body_type',
      driveType: 'drive_type', engineVolume: 'engine_volume', horsePower: 'horse_power',
      color: 'color', condition: 'condition', description: 'description',
      category: 'category_id', isAvailable: 'is_available', isFeatured: 'is_featured',
    };

    for (const [camel, snake] of Object.entries(fieldMap)) {
      if (req.body[camel] !== undefined) {
        updateData[snake] = req.body[camel];
      }
    }

    if (updateData.year) updateData.year = Number(updateData.year);
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.mileage) updateData.mileage = Number(updateData.mileage);
    if (updateData.engine_volume) updateData.engine_volume = Number(updateData.engine_volume);
    if (updateData.horse_power) updateData.horse_power = Number(updateData.horse_power);

    updateData.images = images;

    const { data: updated, error: updateError } = await supabase
      .from('cars')
      .update(updateData)
      .eq('id', req.params.id)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, data: mapCarRow(updated) });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { data: car, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    if (car.images && car.images.length > 0) {
      await Promise.all(car.images.map((img) => deleteImage(img.path)));
    }

    const { error: deleteError } = await supabase
      .from('cars')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Avtomobil muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    next(error);
  }
};

const deleteCarImage = async (req, res, next) => {
  try {
    const { data: car, error: findError } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }

    const images = car.images || [];
    const imageIndex = images.findIndex((img) => img.path === req.params.imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ success: false, message: 'Rasm topilmadi' });
    }

    await deleteImage(images[imageIndex].path);
    images.splice(imageIndex, 1);

    const { data: updated, error: updateError } = await supabase
      .from('cars')
      .update({ images })
      .eq('id', req.params.id)
      .select('*, category:category_id(id, name, slug)')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, message: 'Rasm muvaffaqiyatli o\'chirildi', data: mapCarRow(updated) });
  } catch (error) {
    next(error);
  }
};

const getMonthlyStats = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const months = Array(12).fill(0);
    const views = Array(12).fill(0);
    const now = new Date();
    const currentYear = now.getFullYear();

    (data || []).forEach((car) => {
      const d = new Date(car.created_at);
      if (d.getFullYear() === currentYear) {
        months[d.getMonth()]++;
      }
    });

    const monthNames = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const result = monthNames.map((name, i) => ({
      name,
      cars: months[i],
      views: views[i],
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

function getWeekNumber(d) {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return Math.ceil((dayOfYear + start.getDay()) / 7);
}

const getCarStats = async (req, res, next) => {
  try {
    const { unit = 'month' } = req.query;

    const { data, error } = await supabase
      .from('cars')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const dates = (data || []).map(c => new Date(c.created_at));

    if (dates.length === 0) {
      return res.json({ success: true, data: [], range: null });
    }

    const minDate = dates[0];
    const maxDate = dates[dates.length - 1];

    const range = {
      min: minDate.toISOString(),
      max: maxDate.toISOString(),
    };

    const countMap = {};
    dates.forEach(d => {
      let key;
      if (unit === 'hour') {
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:00`;
      } else if (unit === 'day') {
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      } else if (unit === 'month') {
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      } else if (unit === 'week') {
        const wk = getWeekNumber(d);
        key = `${d.getFullYear()}-W${String(wk).padStart(2, '0')}`;
      } else {
        key = String(d.getFullYear());
      }
      countMap[key] = (countMap[key] || 0) + 1;
    });

    const monthNames = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const result = [];
    const current = new Date(minDate);

    if (unit === 'hour') {
      current.setMinutes(0, 0, 0);
    } else if (unit === 'day') {
      current.setHours(0, 0, 0, 0);
    } else if (unit === 'month') {
      current.setDate(1);
      current.setHours(0, 0, 0, 0);
    } else if (unit === 'week') {
      const day = current.getDay();
      current.setDate(current.getDate() - day);
      current.setHours(0, 0, 0, 0);
    } else {
      current.setMonth(0, 1);
      current.setHours(0, 0, 0, 0);
    }

    while (current <= maxDate) {
      let key, label;

      if (unit === 'hour') {
        key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')} ${String(current.getHours()).padStart(2, '0')}:00`;
        label = `${String(current.getHours()).padStart(2, '0')}:00`;
        current.setHours(current.getHours() + 1);
      } else if (unit === 'day') {
        key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
        label = `${String(current.getDate()).padStart(2, '0')} ${monthNames[current.getMonth()]}`;
        current.setDate(current.getDate() + 1);
      } else if (unit === 'month') {
        key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        label = `${monthNames[current.getMonth()]} ${current.getFullYear()}`;
        current.setMonth(current.getMonth() + 1);
      } else if (unit === 'week') {
        const wk = getWeekNumber(current);
        key = `${current.getFullYear()}-W${String(wk).padStart(2, '0')}`;
        label = `${wk}-hafta (${current.getFullYear()})`;
        current.setDate(current.getDate() + 7);
      } else {
        key = String(current.getFullYear());
        label = key;
        current.setFullYear(current.getFullYear() + 1);
      }

      result.push({ label, value: countMap[key] || 0 });

      if (result.length > 10000) break;
    }

    res.json({ success: true, data: result, range });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCars, getFeaturedCars, getCarById, createCar, updateCar, deleteCar, deleteCarImage, getMonthlyStats, getCarStats };
