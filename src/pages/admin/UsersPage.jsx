import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Shield, Calendar, Trash2 } from 'lucide-react';
import { list, remove } from '../../api/crudService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data, count: total } = await list('users', { order: { by: 'created_at', asc: false } });
      setUsers(data || []);
      setCount(total || 0);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (user) => {
    if (!confirm(`Foydalanuvchini o'chirasizmi?`)) return;
    try {
      await remove('users', user.id);
      setUsers(prev => prev.filter(u => u.id !== user.id));
      setToast({ message: 'Foydalanuvchi o\'chirildi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const joinedDate = (d) => d ? new Date(d).toLocaleDateString('uz-UZ') : '—';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Foydalanuvchilar</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Jami: {count} ta</p>
      </div>
      <div className="relative max-w-xs mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" /></div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><Users className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500 font-medium">Foydalanuvchilar yo'q</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user) => (
            <motion.div key={user.id} layout className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 group">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{user.name || 'Ismsiz'}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{user.email || '—'}</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{user.role || 'user'}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{joinedDate(user.created_at)}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(user)} className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
