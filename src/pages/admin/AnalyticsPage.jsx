import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Car, Users, ListOrdered, DollarSign, TrendingUp, PieChart, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell,
} from 'recharts';
import StatCard from '../../components/admin/StatCard';
import { CardSkeleton, ChartSkeleton } from '../../components/admin/Skeleton';
import { list } from '../../api/crudService';
import { getDashboardStats } from '../../api/adminService';

const COLORS = ['#0a0a0a', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCars: 0, activeOrders: 0, totalUsers: 0, totalRevenue: 0 });
  const [brandData, setBrandData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [yearData, setYearData] = useState([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, carsData, ordersData] = await Promise.all([
        getDashboardStats(),
        list('cars', { select: 'brand, year', limit: '1000' }),
        list('orders', { select: 'status', limit: '1000' }),
      ]);
      setStats(statsData);

      const cars = carsData.data || [];
      const brandCount = {};
      const yearCount = {};
      cars.forEach((c) => {
        if (c.brand) brandCount[c.brand] = (brandCount[c.brand] || 0) + 1;
        if (c.year) yearCount[String(c.year)] = (yearCount[String(c.year)] || 0) + 1;
      });
      setBrandData(Object.entries(brandCount).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value));
      setYearData(Object.entries(yearCount).map(([name, value]) => ({ name, value })).sort((a, b) => a.name.localeCompare(b.name)));

      const orders = ordersData.data || [];
      const statusCount = {};
      orders.forEach((o) => {
        statusCount[o.status || 'pending'] = (statusCount[o.status || 'pending'] || 0) + 1;
      });
      setStatusData(Object.entries(statusCount).map(([name, value]) => ({ name, value })));
    } catch (err) {
      console.error('Analytics fetch error:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const statCards = [
    { label: 'Jami avtomobillar', value: stats.totalCars, icon: Car, trend: null },
    { label: 'Buyurtmalar', value: stats.activeOrders, icon: ListOrdered, trend: null },
    { label: 'Foydalanuvchilar', value: stats.totalUsers, icon: Users, trend: null },
    { label: 'Daromad', value: `${stats.totalRevenue} so'm`, icon: DollarSign, trend: null },
  ];

  const formatNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n || 0;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Analitika</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Sayt statistikasi va tahlillar</p>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
          <TrendingUp className="w-3.5 h-3.5" /> Yangilash
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Brendlar bo'yicha</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Avtomobillar taqsimoti</p>
                </div>
                <PieChart className="w-4 h-4 text-slate-400" />
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <RePieChart>
                  <Pie data={brandData.length > 0 ? brandData : [{ name: 'Ma\'lumot yo\'q', value: 1 }]} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {brandData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </RePieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Buyurtma statuslari</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Status bo'yicha taqsimot</p>
                </div>
                <Activity className="w-4 h-4 text-slate-400" />
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={statusData.length > 0 ? statusData : [{ name: 'Ma\'lumot yo\'q', value: 1 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
                  <Bar dataKey="value" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Yil bo'yicha</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Avtomobillar ishlab chiqarilgan yili</p>
                </div>
                <BarChart3 className="w-4 h-4 text-slate-400" />
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={yearData.length > 0 ? yearData : [{ name: 'Ma\'lumot yo\'q', value: 1 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Umumiy ko'rsatkichlar</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Barcha ma'lumotlar</p>
                </div>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Jami avtomobillar</p><p className="text-[11px] text-slate-500">Barcha mavjud avtomobillar</p></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{formatNumber(stats.totalCars)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><ListOrdered className="w-4 h-4 text-white" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Buyurtmalar</p><p className="text-[11px] text-slate-500">Jami buyurtmalar soni</p></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{formatNumber(stats.activeOrders)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Foydalanuvchilar</p><p className="text-[11px] text-slate-500">Ro'yxatdan o'tganlar</p></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{formatNumber(stats.totalUsers)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center"><DollarSign className="w-4 h-4 text-white" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Daromad</p><p className="text-[11px] text-slate-500">Umumiy daromad</p></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{formatNumber(stats.totalRevenue)} so'm</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
