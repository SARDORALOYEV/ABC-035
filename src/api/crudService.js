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

function buildQuery(params) {
  const q = new URLSearchParams();
  if (params.order) {
    q.set('orderBy', params.order.by);
    q.set('orderAsc', params.order.asc !== false ? 'true' : 'false');
  }
  if (params.limit) q.set('limit', params.limit);
  if (params.range) {
    q.set('offset', params.range[0]);
    q.set('limit', params.range[1] - params.range[0] + 1);
  }
  if (params.eq) {
    q.set('eqField', params.eq.field);
    q.set('eqValue', params.eq.value);
  }
  if (params.ilike) {
    q.set('ilikeField', params.ilike.field);
    q.set('ilikeValue', params.ilike.value);
  }
  if (params.select) q.set('select', params.select);
  return q.toString();
}

export async function list(table, options = {}) {
  const query = buildQuery(options);
  const res = await apiRequest(`/crud/${table}${query ? `?${query}` : ''}`);
  return { data: res.data || [], count: res.total || res.count || 0 };
}

export async function getById(table, id) {
  const res = await apiRequest(`/crud/${table}/${id}`);
  return res.data;
}

export async function create(table, payload) {
  const res = await apiRequest(`/crud/${table}`, {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

export async function update(table, id, payload) {
  const res = await apiRequest(`/crud/${table}/${id}`, {
    method: 'PUT',
    body: payload,
  });
  return res.data;
}

export async function remove(table, id) {
  await apiRequest(`/crud/${table}/${id}`, {
    method: 'DELETE',
  });
  return true;
}

export async function getOrders(options = {}) {
  const query = buildQuery({ ...options, select: '*, car:car_id(id, title, brand, model, price, images)' });
  const res = await apiRequest(`/crud/orders${query ? `?${query}` : ''}`);
  return { data: res.data || [], count: res.total || res.count || 0 };
}

export async function getAdminUsers(options = {}) {
  const query = buildQuery(options);
  const res = await apiRequest(`/crud/admin_profiles${query ? `?${query}` : ''}`);
  return { data: res.data || [], count: res.total || res.count || 0 };
}

export async function saveSettings(key, value) {
  await apiRequest(`/settings/${key}`, {
    method: 'PUT',
    body: { value },
  });
  return true;
}

export async function getSettings(key) {
  const res = await apiRequest(`/settings/${key}`);
  return res.data;
}

export async function getAllSettings() {
  const res = await apiRequest('/settings');
  return res.data || {};
}
