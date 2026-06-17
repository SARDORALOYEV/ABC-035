const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');

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

  if (!res.ok) {
    throw new Error(data.message || 'So\'rov bajarilmadi');
  }

  return data;
}

export async function loginAdmin(email, password) {
  const res = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  const { token, ...user } = res.data;
  localStorage.setItem('admin_token', token);

  return {
    user: { id: user.id, email: user.email },
    profile: { full_name: user.name || user.email?.split('@')[0], role: user.role, email: user.email },
  };
}

export async function logoutAdmin() {
  localStorage.removeItem('admin_token');
}

export async function getAdminSession() {
  const token = localStorage.getItem('admin_token');
  if (!token) return null;

  try {
    const res = await request('/auth/me');
    const user = res.data;
    return {
      user: { id: user.id, email: user.email, created_at: new Date().toISOString() },
      profile: { full_name: user.name || user.email?.split('@')[0], role: user.role, email: user.email },
    };
  } catch {
    localStorage.removeItem('admin_token');
    return null;
  }
}

export async function updateAdminProfile(updates) {
  const token = localStorage.getItem('admin_token');
  if (!token) throw new Error('Avval tizimga kiring');

  const res = await request('/auth/profile', {
    method: 'PUT',
    body: updates,
  });

  return res.data;
}

export async function registerAdmin(email, password, fullName) {
  const res = await request('/auth/register', {
    method: 'POST',
    body: { name: fullName, email, password },
  });

  const { token, ...user } = res.data;
  localStorage.setItem('admin_token', token);

  return { id: user.id, email: user.email };
}

export async function sendPasswordReset(email) {
  throw new Error('Parolni tiklash faqat backend orqali amalga oshiriladi');
}

export async function updatePassword(newPassword) {
  throw new Error('Parolni o\'zgartirish faqat backend orqali amalga oshiriladi');
}
