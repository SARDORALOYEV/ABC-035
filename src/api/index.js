import { supabase } from '../supabaseClient';

const API_BASE = '/api'

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
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const config = {
    ...options,
    headers,
  }

  if (config.body instanceof FormData) {
    delete config.headers['Content-Type']
  } else if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const carsAPI = {
  getAll: async (params = {}) => {
    try {
      let query = supabase
        .from('cars')
        .select('*, category:category_id(id, name, slug)', { count: 'exact' })
        .order('created_at', { ascending: false })

      const limit = Math.min(50, Math.max(1, Number(params.limit) || 50))
      if (limit) query = query.limit(limit)

      const { data, error, count } = await query
      if (error) throw error

      return {
        success: true,
        count: data.length,
        total: count,
        data: (data || []).map(mapCarRow),
      }
    } catch (err) {
      console.warn('Supabase getAll failed, falling back to API:', err.message)
      const query = new URLSearchParams(params).toString()
      return request(`/cars${query ? `?${query}` : ''}`)
    }
  },
  getFeatured: async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*, category:category_id(id, name, slug)')
        .eq('is_featured', true)
        .limit(6)
      if (error) throw error
      return { success: true, data: (data || []).map(mapCarRow) }
    } catch {
      return carsAPI.getAll({ limit: 6 })
    }
  },
  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*, category:category_id(id, name, slug)')
        .eq('id', id)
        .single()
      if (error) throw error
      return { success: true, data: mapCarRow(data) }
    } catch (err) {
      console.warn('Supabase getById failed, falling back to API:', err.message)
      return request(`/cars/${id}`)
    }
  },
  create: (formData) =>
    request('/cars', {
      method: 'POST',
      body: formData,
    }),
  update: (id, formData) =>
    request(`/cars/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  delete: (id) => request(`/cars/${id}`, { method: 'DELETE' }),
  deleteImage: (carId, imageId) =>
    request(`/cars/${carId}/images/${imageId}`, { method: 'DELETE' }),
}

export const authAPI = {
  login: (body) =>
    request('/auth/login', { method: 'POST', body }),
  register: (body) =>
    request('/auth/register', { method: 'POST', body }),
  getMe: () => request('/auth/me'),
}

export const categoriesAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      if (error) throw error
      return { success: true, data: data || [] }
    } catch (err) {
      console.warn('Supabase categories failed, falling back to API:', err.message)
      return request('/categories')
    }
  },
  getById: (id) => request(`/categories/${id}`),
  create: (formData) =>
    request('/categories', {
      method: 'POST',
      body: formData,
    }),
}

export const ordersAPI = {
  create: (body) =>
    request('/orders', { method: 'POST', body }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/orders${query ? `?${query}` : ''}`)
  },
}

export const healthAPI = {
  check: () => request('/health'),
}
