import { supabase } from '../supabaseClient';
import { carsAPI, ordersAPI } from './index';

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

export async function getDashboardStats() {
  try {
    const [carsRes, ordersRes, usersRes, revenueRes] = await Promise.allSettled([
      carsAPI.getAll({ limit: '1' }),
      apiRequest('/orders?limit=1000'),
      apiRequest('/users/count'),
      apiRequest('/crud/orders?select=status,car_id&limit=1000'),
    ]);

    const totalCars = carsRes.status === 'fulfilled'
      ? (carsRes.value?.total || carsRes.value?.count || 0)
      : 0;

    const ordersData = ordersRes.status === 'fulfilled' ? (ordersRes.value?.data || ordersRes.value || []) : [];
    const totalOrders = Array.isArray(ordersData) ? ordersData.length : 0;

    const totalUsers = usersRes.status === 'fulfilled'
      ? (usersRes.value?.count || 0)
      : 0;

    const revenueOrders = revenueRes.status === 'fulfilled' ? (revenueRes.value?.data || []) : [];
    const totalRevenue = Array.isArray(revenueOrders) ? revenueOrders.length * 15000 : 0;

    return { totalCars, activeOrders: totalOrders, totalUsers, totalRevenue };
  } catch {
    return { totalCars: 0, activeOrders: 0, totalUsers: 0, totalRevenue: 0 };
  }
}

export async function getMonthlyStats() {
  try {
    const res = await fetch('/api/cars/monthly-stats');
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch (err) {
    console.error('Monthly stats error:', err);
  }
  return [];
}

export async function getCarStats(unit = 'hour') {
  try {
    const res = await fetch(`/api/cars/stats?unit=${unit}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('Car stats error:', err);
  }
  return { data: [], range: null };
}

export function subscribeToCars(callback) {
  const channel = supabase
    .channel('cars-changes-' + Date.now())
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'cars' },
      (payload) => {
        callback({ type: 'add', action: `${payload.new.brand} ${payload.new.model} qo'shildi`, data: payload.new });
      }
    )
    .subscribe();

  return () => { try { supabase.removeChannel(channel); } catch {} };
}

export function subscribeToOrders(callback) {
  const channel = supabase
    .channel('orders-changes-' + Date.now())
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        callback({ type: 'order', action: `Yangi buyurtma #${payload.new.id}`, data: payload.new });
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders', filter: `status=eq.completed` },
      (payload) => {
        callback({ type: 'order', action: `Buyurtma #${payload.new.id} tasdiqlandi`, data: payload.new });
      }
    )
    .subscribe();

  return () => { try { supabase.removeChannel(channel); } catch {} };
}

export function subscribeToActivityLog(callback) {
  return subscribeToCars((event) => {
    callback({
      ...event,
      time: new Date().toISOString(),
    });
  });
}

export async function logActivity(action, type = 'info', metadata = {}) {
  try {
    await apiRequest('/crud/activity_log', {
      method: 'POST',
      body: { action, type, metadata, created_at: new Date().toISOString() },
    });
  } catch (err) {
    console.error('Activity log error:', err);
  }
}

export async function getRecentActivity(limit = 20) {
  try {
    const res = await apiRequest(`/crud/activity_log?orderBy=created_at&orderAsc=false&limit=${limit}`);
    return res.data || [];
  } catch {
    return [];
  }
}

export function subscribeToRealtimeActivity(callback) {
  const channel = supabase
    .channel('activity-realtime-' + Date.now())
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'activity_log' },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => { try { supabase.removeChannel(channel); } catch {} };
}

export function subscribeToAllChanges(carCb, orderCb, userCb) {
  const channels = [];
  const ts = Date.now();

  if (carCb) {
    const c1 = supabase
      .channel('realtime-cars-' + ts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, carCb)
      .subscribe();
    channels.push(c1);
  }

  if (orderCb) {
    const c2 = supabase
      .channel('realtime-orders-' + ts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, orderCb)
      .subscribe();
    channels.push(c2);
  }

  if (userCb) {
    const c3 = supabase
      .channel('realtime-users-' + ts)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, userCb)
      .subscribe();
    channels.push(c3);
  }

  return () => channels.forEach(c => { try { supabase.removeChannel(c); } catch {} });
}
