import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ListOrdered, Search, Phone, Mail, Clock, Car, History } from 'lucide-react';
import { getOrders, update } from '../../api/crudService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';

const statusMap = {
  yangi: { label: 'Yangi', class: 'bg-amber-100 text-amber-700' },
  korib_chiqilmoqda: { label: "Ko'rib chiqilmoqda", class: 'bg-blue-100 text-blue-700' },
  yakunlangan: { label: 'Yakunlangan', class: 'bg-emerald-100 text-emerald-700' },
  bekor_qilingan: { label: 'Bekor qilingan', class: 'bg-red-100 text-red-700' },
};

const statuses = ['yangi', 'korib_chiqilmoqda', 'yakunlangan', 'bekor_qilingan'];
const historyStatuses = ['yakunlangan', 'bekor_qilingan'];

export default function Orders() {
  const location = useLocation();
  const isHistory = location.pathname.includes('/history');
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const opts = { order: { by: 'created_at', asc: false } };
    if (isHistory) {
      const { data: all, count: total } = await getOrders({ order: { by: 'created_at', asc: false } });
      const filtered = (all || []).filter(o => o.status === 'yakunlangan' || o.status === 'bekor_qilingan');
      setOrders(filtered);
      setCount(filtered.length);
    } else {
      const { data, count: total } = await getOrders(opts);
      setOrders(data || []);
      setCount(total || 0);
    }
    setLoading(false);
  }, [isHistory]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleStatus = async (id, status) => {
    try {
      await update('orders', id, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      setToast({ message: `Status "${statusMap[status]?.label}" ga o'zgartirildi`, type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const filtered = orders.filter(o =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.includes(search)
  );

  const timeAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min`;
    return `${Math.floor(mins / 60)} soat`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {isHistory ? 'Buyurtmalar tarixi' : 'Buyurtmalar'}
          </h1>
          {isHistory && <History className="w-4 h-4 text-slate-400" />}
        </div>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Jami: {count} ta</p>
      </div>
      <div className="relative max-w-xs mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ism yoki tel..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" /></div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><ListOrdered className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500 font-medium">Buyurtmalar yo'q</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <motion.div key={order.id} layout className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-slate-900">{order.name}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusMap[order.status]?.class || statusMap.yangi.class}`}>
                    {statusMap[order.status]?.label || 'Yangi'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{order.phone}</span>
                  {order.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{order.email}</span>}
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(order.created_at)} oldin</span>
                </div>
                {order.car && (
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                    <Car className="w-3 h-3" />{order.car.title || `${order.car.brand} ${order.car.model}`}
                  </p>
                )}
              </div>
              {!isHistory && (
                <div className="flex gap-1.5 sm:flex-shrink-0">
                  {statuses.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatus(order.id, s)}
                      disabled={order.status === s}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                        order.status === s
                          ? 'bg-slate-800 text-white cursor-default'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {statusMap[s]?.label}
                    </button>
                  ))}
                </div>
              )}
              {isHistory && (
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg ${statusMap[order.status]?.class || statusMap.yangi.class}`}>
                  {statusMap[order.status]?.label}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
