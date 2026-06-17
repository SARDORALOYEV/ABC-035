const API_BASE = '/api'

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
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/cars${query ? `?${query}` : ''}`)
  },
  getFeatured: () => request('/cars/featured'),
  getById: (id) => request(`/cars/${id}`),
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
  getAll: () => request('/categories'),
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
