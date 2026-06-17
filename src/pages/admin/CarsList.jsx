import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Plus, Trash2, Edit3, Car, Loader2 } from 'lucide-react';
import { list, remove } from '../../api/crudService';
import { logActivity } from '../../api/adminService';
import Toast from '../../components/admin/Toast';
import { CardSkeleton } from '../../components/admin/Skeleton';
import { getCarImageUrl } from '../../utils/imageHelper';

export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const options = { limit: 100, order: { by: 'created_at', asc: false } };
      if (search) options.ilike = { field: 'title', value: search };
      const result = await list('cars', options);
      setCars(result.data);
      setCount(result.count);
    } catch (err) {
      console.error('Avtomobillarni yuklashda xatolik:', err);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const handleDelete = async (car) => {
    if (!confirm(`${car.brand} ${car.model} ni o'chirishni tasdiqlaysizmi?`)) return;
    setDeleting(car.id);
    try {
      await remove('cars', car.id);
      logActivity(`${car.brand} ${car.model} o'chirildi`, 'delete', { brand: car.brand, model: car.model });
      setCars(prev => prev.filter(c => c.id !== car.id));
      setCount(prev => prev - 1);
      setToast({ message: 'Avtomobil o\'chirildi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally { setDeleting(null); }
  };

  const formatPrice = (p) => {
    if (!p) return '—';
    return new Intl.NumberFormat('uz-UZ').format(p) + ' so\'m';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Avtomobillar</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Jami: {count} ta</p>
        </div>
        <Link
          to="/admin/add-car"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi avtomobil
        </Link>
      </div>

      <div className="relative max-w-xs mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Qidirish..."
          className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Avtomobillar topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden group"
            >
              <div className="h-36 bg-slate-100 relative overflow-hidden">
                {car.images?.[0] ? (
                  <img src={getCarImageUrl(car.images[0])} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/admin/add-car?id=${car.id}`}
                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(car)}
                    disabled={deleting === car.id}
                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white"
                  >
                    {deleting === car.id ? <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" /> : <Trash2 className="w-3.5 h-3.5 text-red-500" />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900 truncate">{car.title || `${car.brand} ${car.model}`}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{car.year} · {car.fuel_type}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold text-slate-900">{formatPrice(car.price)}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    {car.mileage && <span>{car.mileage} km</span>}
                    <span className="capitalize">{car.transmission}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
