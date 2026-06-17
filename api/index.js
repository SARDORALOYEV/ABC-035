import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function mapCarRow(row) {
  return {
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
  };
}

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname.replace('/api', '') || '/';
  const params = Object.fromEntries(url.searchParams);

  try {
    if (path === '/cars' || path === '/cars/' || path === '') {
      if (req.method === 'GET') {
        let query = supabase
          .from('cars')
          .select('*, category:category_id(id, name, slug)', { count: 'exact' })
          .order('created_at', { ascending: false });

        const limit = Math.min(50, Math.max(1, Number(params.limit) || 50));
        query = query.limit(limit);

        const { data, error, count } = await query;
        if (error) throw error;

        return res.json({
          success: true,
          count: data.length,
          total: count,
          page: 1,
          pages: Math.ceil(count / limit),
          data: (data || []).map(mapCarRow),
        });
      }
    }

    if (path === '/cars/featured') {
      const { data, error } = await supabase
        .from('cars')
        .select('*, category:category_id(id, name, slug)', { count: 'exact' })
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return res.json({
        success: true,
        data: (data || []).map(mapCarRow),
      });
    }

    const carMatch = path.match(/^\/cars\/([^/]+)$/);
    if (carMatch) {
      const id = carMatch[1];
      if (req.method === 'GET') {
        const { data, error } = await supabase
          .from('cars')
          .select('*, category:category_id(id, name, slug)')
          .eq('id', id)
          .single();
        if (error) throw error;
        return res.json({ success: true, data: mapCarRow(data) });
      }
    }
      const { data, error } = await supabase
        .from('cars')
        .select('*, category:category_id(id, name, slug)', { count: 'exact' })
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return res.json({
        success: true,
        data: (data || []).map(mapCarRow),
      });
    }

    if (path === '/categories' || path === '/categories/') {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return res.json({ success: true, data: data || [] });
    }

    return res.status(404).json({ success: false, message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
