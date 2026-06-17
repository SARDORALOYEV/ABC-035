import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Phone, Mail, Clock, Car, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getOrders, remove } from '../../api/crudService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await getOrders({ order: { by: 'created_at', asc: false } });
    const withMessages = (data || []).filter(o => o.message?.trim());
    setMessages(withMessages);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (id) => {
    if (!confirm('Xabarni o\'chirasizmi?')) return;
    try {
      await remove('orders', id);
      setMessages(prev => prev.filter(m => m.id !== id));
      setToast({ message: 'Xabar o\'chirildi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const filtered = messages.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.phone?.includes(search) ||
    m.message?.toLowerCase().includes(search.toLowerCase())
  );

  const timeAgo = (d) => {
    if (!d) return '';
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Hozir';
    if (mins < 60) return `${mins} min oldin`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} soat oldin`;
    const days = Math.floor(hours / 24);
    return `${days} kun oldin`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Xabarlar</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Foydalanuvchi xabarlari: {messages.length} ta</p>
      </div>
      <div className="relative max-w-xs mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500 font-medium">Xabarlar yo'q</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <motion.div key={msg.id} layout className="bg-white rounded-xl border border-slate-200 overflow-hidden group">
              <div
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              >
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {msg.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{msg.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{timeAgo(msg.created_at)}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                  {expanded === msg.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
              {expanded === msg.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-slate-100 px-4 py-3 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{msg.phone}</span>
                    {msg.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>}
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(msg.created_at).toLocaleString('uz-UZ')}</span>
                  </div>
                  {msg.car && (
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Car className="w-3 h-3" />{msg.car.title || `${msg.car.brand} ${msg.car.model}`}
                    </p>
                  )}
                  <p className="text-sm text-slate-700 bg-white rounded-lg p-3 border border-slate-200">
                    {msg.message}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
