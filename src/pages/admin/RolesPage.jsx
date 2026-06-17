import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, UserCog, Search, Mail, Calendar, Loader2, Check, X } from 'lucide-react';
import { list, update } from '../../api/crudService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';

const roleColors = {
  admin: 'bg-indigo-100 text-indigo-700',
  user: 'bg-slate-100 text-slate-600',
};

export default function RolesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(null);
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await list('users', { order: { by: 'created_at', asc: false } });
    setUsers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleRoleChange = async (user, newRole) => {
    if (user.role === newRole) return;
    setSaving(user.id);
    try {
      const updated = await update('users', user.id, { role: newRole });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: updated.role || newRole } : u));
      setToast({ message: `Rol o'zgartirildi: ${newRole}`, type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally { setSaving(null); }
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
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Rollar</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Foydalanuvchi rollarini boshqarish</p>
      </div>
      <div className="relative max-w-xs mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><UserCog className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500 font-medium">Foydalanuvchilar yo'q</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user) => (
            <motion.div key={user.id} layout className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 group">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-900">{user.name || 'Ismsiz'}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColors[user.role] || roleColors.user}`}>
                    {user.role || 'user'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{user.email || '—'}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{joinedDate(user.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleRoleChange(user, 'user')}
                  disabled={saving === user.id || user.role === 'user'}
                  className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                    user.role === 'user'
                      ? 'bg-slate-800 text-white cursor-default'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {saving === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                  User
                </button>
                <button
                  onClick={() => handleRoleChange(user, 'admin')}
                  disabled={saving === user.id || user.role === 'admin'}
                  className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                    user.role === 'admin'
                      ? 'bg-indigo-600 text-white cursor-default'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {saving === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Shield className="w-3 h-3" />}
                  Admin
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
