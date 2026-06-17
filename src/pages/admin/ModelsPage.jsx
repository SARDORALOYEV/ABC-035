import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Tag, Search, X } from 'lucide-react';
import { list, create, update, remove } from '../../api/crudService';
import Toast from '../../components/admin/Toast';

export default function ModelsPage() {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const [mRes, bRes] = await Promise.all([
      list('models', { order: { by: 'name', asc: true } }),
      list('brands', { order: { by: 'name', asc: true } }),
    ]);
    setModels(mRes.data || []);
    setBrands(bRes.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { name: fd.get('name'), brand_id: fd.get('brand_id') || null };
    if (!payload.name) return;
    setSaving(true);
    try {
      if (modal.mode === 'add') {
        const item = await create('models', payload);
        setModels(prev => [...prev, item]);
        setToast({ message: 'Model qo\'shildi', type: 'success' });
      } else {
        const item = await update('models', modal.data.id, payload);
        setModels(prev => prev.map(m => m.id === item.id ? item : m));
        setToast({ message: 'Model yangilandi', type: 'success' });
      }
      setModal(null);
    } catch (err) { setToast({ message: err.message, type: 'error' }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (model) => {
    if (!confirm(`"${model.name}" ni o'chirasizmi?`)) return;
    try {
      await remove('models', model.id);
      setModels(prev => prev.filter(m => m.id !== model.id));
      setToast({ message: 'Model o\'chirildi', type: 'success' });
    } catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  const brandMap = Object.fromEntries(brands.map(b => [b.id, b.name]));
  const filtered = models.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Modellar</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Jami: {models.length} ta</p>
        </div>
        <button onClick={() => setModal({ mode: 'add', data: { name: '', brand_id: '' } })} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800"><Plus className="w-4 h-4" /> Yangi model</button>
      </div>
      <div className="relative max-w-xs mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" /></div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{[...Array(8)].map((_, i) => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((model) => (
            <motion.div key={model.id} layout className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0"><Tag className="w-4 h-4 text-slate-400" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{model.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{brandMap[model.brand_id] || '—'}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModal({ mode: 'edit', data: model })} className="p-1.5 rounded-lg hover:bg-slate-100"><Pencil className="w-3.5 h-3.5 text-slate-500" /></button>
                <button onClick={() => handleDelete(model)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl border border-slate-200 p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">{modal.mode === 'add' ? 'Yangi model' : 'Modelni tahrirlash'}</h3>
              <button onClick={() => setModal(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nomi *</label>
                <input name="name" defaultValue={modal.data.name} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Brend</label>
                <select name="brand_id" defaultValue={modal.data.brand_id || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
                  <option value="">Brend tanlang</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Bekor qilish</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}{modal.mode === 'add' ? 'Qo\'shish' : 'Saqlash'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
