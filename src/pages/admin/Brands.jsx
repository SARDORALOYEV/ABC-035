import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Building2, Search, X, Check } from 'lucide-react';
import { list, create, update, remove } from '../../api/crudService';
import Toast from '../../components/admin/Toast';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', data: {} }
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await list('brands', { order: { by: 'name', asc: true } });
    setBrands(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { name: fd.get('name'), slug: fd.get('slug'), logo_url: fd.get('logo_url') };
    if (!payload.name) return;

    setSaving(true);
    try {
      if (modal.mode === 'add') {
        const item = await create('brands', payload);
        setBrands(prev => [...prev, item]);
        setToast({ message: 'Brend qo\'shildi', type: 'success' });
      } else {
        const item = await update('brands', modal.data.id, payload);
        setBrands(prev => prev.map(b => b.id === item.id ? item : b));
        setToast({ message: 'Brend yangilandi', type: 'success' });
      }
      setModal(null);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally { setSaving(false); }
  };

  const handleDelete = async (brand) => {
    if (!confirm(`"${brand.name}" ni o'chirasizmi?`)) return;
    try {
      await remove('brands', brand.id);
      setBrands(prev => prev.filter(b => b.id !== brand.id));
      setToast({ message: 'Brend o\'chirildi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const filtered = brands.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Brendlar</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Jami: {brands.length} ta</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add', data: { name: '', slug: '', logo_url: '' } })}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Yangi brend
        </button>
      </div>

      <div className="relative max-w-xs mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((brand) => (
            <motion.div key={brand.id} layout className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                {brand.logo_url ? (
                  <img src={brand.logo_url} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <Building2 className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{brand.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{brand.slug || '—'}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModal({ mode: 'edit', data: brand })} className="p-1.5 rounded-lg hover:bg-slate-100"><Pencil className="w-3.5 h-3.5 text-slate-500" /></button>
                <button onClick={() => handleDelete(brand)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl border border-slate-200 p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">{modal.mode === 'add' ? 'Yangi brend' : 'Brendni tahrirlash'}</h3>
              <button onClick={() => setModal(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nomi *</label>
                <input name="name" defaultValue={modal.data.name} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Slug</label>
                <input name="slug" defaultValue={modal.data.slug} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Logo URL</label>
                <input name="logo_url" defaultValue={modal.data.logo_url} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Bekor qilish</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {modal.mode === 'add' ? 'Qo\'shish' : 'Saqlash'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
