import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Download, Car, Users, ListOrdered, Loader2, Check, Calendar } from 'lucide-react';
import { list } from '../../api/crudService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';

const reportTypes = [
  { key: 'cars', label: 'Avtomobillar', icon: Car, desc: 'Barcha avtomobillar ro\'yxati' },
  { key: 'orders', label: 'Buyurtmalar', icon: ListOrdered, desc: 'Buyurtmalar haqida hisobot' },
  { key: 'users', label: 'Foydalanuvchilar', icon: Users, desc: 'Foydalanuvchilar ro\'yxati' },
];

function downloadCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => {
      const val = row[h];
      const str = val == null ? '' : String(val);
      return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(null);
  const [reportData, setReportData] = useState({});
  const [toast, setToast] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [carsData, ordersData, usersData] = await Promise.all([
        list('cars', { limit: '1000' }),
        list('orders', { limit: '1000' }),
        list('users', { limit: '1000' }),
      ]);
      setReportData({ cars: carsData.data || [], orders: ordersData.data || [], users: usersData.data || [] });
    } catch (err) {
      console.error('Reports fetch error:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleExport = async (type, format) => {
    setGenerating(`${type}-${format}`);
    try {
      let data = reportData[type] || [];
      if (type === 'cars') {
        data = data.map((c, i) => ({
          '#': i + 1,
          Nomi: c.title || `${c.brand} ${c.model}`,
          Brand: c.brand,
          Model: c.model,
          Yil: c.year,
          Narx: c.price,
          Status: c.is_available ? 'Mavjud' : 'Sotilgan',
        }));
      } else if (type === 'orders') {
        data = data.map((o, i) => ({
          '#': i + 1,
          'Ism': o.name,
          'Telefon': o.phone,
          'Email': o.email || '',
          'Status': o.status,
          'Xabar': o.message || '',
          'Sana': new Date(o.created_at).toLocaleDateString('uz-UZ'),
        }));
      } else if (type === 'users') {
        data = data.map((u, i) => ({
          '#': i + 1,
          'Ism': u.name || '',
          'Email': u.email,
          'Rol': u.role || 'user',
          'Ro\'yxatdan o\'tgan': new Date(u.created_at).toLocaleDateString('uz-UZ'),
        }));
      }

      const filename = `${type}-report-${new Date().toISOString().split('T')[0]}`;
      if (format === 'csv') downloadCSV(data, filename);
      else downloadJSON(data, filename);
      setToast({ message: 'Hisobot yuklab olindi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally { setGenerating(null); }
  };

  const today = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hisobotlar</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Yuklab olinadigan hisobotlar</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-medium">{today}</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((rt, i) => {
            const count = reportData[rt.key]?.length || 0;
            return (
              <motion.div
                key={rt.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                    <rt.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{rt.label}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{rt.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg mb-4">
                  <span className="text-xs text-slate-500 font-medium">Jami yozuvlar</span>
                  <span className="text-lg font-bold text-slate-900">{count}</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExport(rt.key, 'csv')}
                    disabled={generating === `${rt.key}-csv` || count === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                  >
                    {generating === `${rt.key}-csv` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    CSV yuklab olish
                  </button>
                  <button
                    onClick={() => handleExport(rt.key, 'json')}
                    disabled={generating === `${rt.key}-json` || count === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                    {generating === `${rt.key}-json` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                    JSON yuklab olish
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
