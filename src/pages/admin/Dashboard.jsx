import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, ListOrdered, DollarSign, Calendar, RefreshCw, ChevronDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/admin/StatCard';
import { CardSkeleton, ChartSkeleton } from '../../components/admin/Skeleton';
import {
  getDashboardStats,
  getCarStats,
  getRecentActivity,
  subscribeToRealtimeActivity,
  subscribeToAllChanges,
} from '../../api/adminService';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Hozir';
  if (mins < 60) return `${mins} daqiqa oldin`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  return `${days} kun oldin`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const units = [
  { key: 'month', label: 'Oy bo\'yicha' },
  { key: 'year', label: 'Yil bo\'yicha' },
  { key: 'week', label: 'Hafta bo\'yicha' },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0, activeOrders: 0, totalUsers: 0, totalRevenue: 0,
  });
  const [chartUnit, setChartUnit] = useState('month');
  const [chartData, setChartData] = useState([]);
  const [chartRange, setChartRange] = useState(null);
  const [activity, setActivity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch {}
  }, []);

  const loadChart = useCallback(async (unit) => {
    try {
      const res = await getCarStats(unit);
      if (res && res.data) setChartData(res.data);
      if (res && res.range) setChartRange(res.range);
      else setChartData([]);
    } catch {
      setChartData([]);
    }
  }, []);

  const loadActivity = useCallback(async () => {
    try {
      const data = await getRecentActivity(20);
      setActivity(data);
    } catch {}
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadStats(), loadActivity()]);
    await loadChart(chartUnit);
    setTimeout(() => setRefreshing(false), 400);
  }, [loadStats, loadActivity, loadChart, chartUnit]);

  useEffect(() => {
    (async () => {
      await Promise.all([loadStats(), loadChart('month'), loadActivity()]);
      setLoading(false);
    })();
  }, [loadStats, loadChart, loadActivity]);

  useEffect(() => {
    loadChart(chartUnit);
  }, [chartUnit, loadChart]);

  useEffect(() => {
    const unsubActivity = subscribeToRealtimeActivity((entry) => {
      setActivity((prev) => [entry, ...prev].slice(0, 20));
    });

    const unsubChanges = subscribeToAllChanges(
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setStats((prev) => ({ ...prev, totalCars: prev.totalCars + 1 }));
          setActivity((prev) => [{
            id: `car-${Date.now()}`,
            action: `${payload.new.brand} ${payload.new.model} qo'shildi`,
            type: 'add',
            created_at: new Date().toISOString(),
          }, ...prev].slice(0, 20));
        }
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setStats((prev) => ({ ...prev, activeOrders: prev.activeOrders + 1 }));
        }
      },
      () => {
        setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
      }
    );

    return () => {
      unsubActivity();
      unsubChanges();
    };
  }, []);

  const formatNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n || 0;
  };

  const statCards = [
    { label: 'Jami avtomobillar', value: formatNumber(stats.totalCars), icon: Car, trend: null },
    { label: 'Faol buyurtmalar', value: formatNumber(stats.activeOrders), icon: ListOrdered, trend: null },
    { label: 'Foydalanuvchilar', value: formatNumber(stats.totalUsers), icon: Users, trend: null },
    { label: 'Daromad', value: `${formatNumber(stats.totalRevenue)} so'm`, icon: DollarSign, trend: null },
  ];

  const activityTypeColor = {
    add: 'bg-emerald-500',
    order: 'bg-blue-500',
    user: 'bg-violet-500',
    update: 'bg-amber-500',
    delete: 'bg-red-500',
    info: 'bg-slate-500',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Admin panelga xush kelibsiz</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshAll}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Yangilash
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-medium">{new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="lg:col-span-2"><ChartSkeleton /></div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Avtomobil statistikasi</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {chartRange
                    ? `${new Date(chartRange.min).toLocaleString('uz-UZ', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })} — ${new Date(chartRange.max).toLocaleString('uz-UZ', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}`
                    : chartData.length > 0 ? `${chartData.length} ta nuqta` : 'Ma\'lumot yo\'q'}
                </p>
              </div>
              <div className="relative">
                <select
                  value={chartUnit}
                  onChange={(e) => setChartUnit(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 focus:border-slate-400 transition-colors"
                >
                  {units.map(u => (
                    <option key={u.key} value={u.key}>{u.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.length > 0 ? chartData : [{ label: 'Ma\'lumot yo\'q', value: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
                <YAxis domain={[0, 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="bg-white rounded-xl border border-slate-200 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">So'nggi harakatlar</h3>
            <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">Real-time</span>
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto scrollbar-thin">
            {activity.length === 0 && !loading && (
              <p className="text-sm text-slate-400 text-center py-8">Hozircha hech qanday harakat yo'q</p>
            )}
            {activity.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityTypeColor[item.type] || 'bg-slate-500'}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{item.action}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{timeAgo(item.created_at)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Jami avtomobillar</span>
              <span className="text-slate-900 font-semibold">{stats.totalCars}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-slate-500 font-medium">Buyurtmalar</span>
              <span className="text-slate-900 font-semibold">{stats.activeOrders}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-slate-500 font-medium">Foydalanuvchilar</span>
              <span className="text-slate-900 font-semibold">{stats.totalUsers}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
