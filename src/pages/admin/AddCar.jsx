import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Upload, Loader2, Trash2, ChevronDown } from 'lucide-react';
import { uploadCarImage, addCar, updateCar, fetchCategories, formOptions } from '../../api/carService';
import { logActivity } from '../../api/adminService';
import Toast from '../../components/admin/Toast';
import { cn } from '../../utils/cn';
import { FormSkeleton } from '../../components/admin/Skeleton';
import { getCarImageUrl } from '../../utils/imageHelper';

const initialForm = {
  title: '',
  brand: '',
  model: '',
  description: '',
  year: new Date().getFullYear(),
  price: '',
  mileage: '',
  fuelType: '',
  transmission: '',
  bodyType: '',
  categoryId: '',
};

const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 font-medium';

export default function AddCar() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const isEdit = Boolean(editId);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);

        if (editId) {
          const res = await fetch(`/api/cars/${editId}`);
          const json = await res.json();
          if (json.data) {
            const c = json.data;
            setForm({
              title: c.title || '',
              brand: c.brand || '',
              model: c.model || '',
              description: c.description || '',
              year: c.year || new Date().getFullYear(),
              price: c.price || '',
              mileage: c.mileage || '',
              fuelType: c.fuelType || '',
              transmission: c.transmission || '',
              bodyType: c.bodyType || '',
              categoryId: c.category_id || c.category?.id || '',
            });
            if (c.images && c.images.length > 0) {
              setExistingImages(c.images);
            }
          }
        }
      } catch (err) {
        setToast({ message: err.message || 'Yuklashda xatolik', type: 'error' });
      } finally {
        setPageLoading(false);
      }
    })();
  }, [editId]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);
    setPreviews(newImages.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newImages.map((f) => URL.createObjectURL(f)));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.brand || !form.model || !form.price || !form.fuelType || !form.transmission || !form.bodyType || !form.categoryId) {
      showToast('Barcha majburiy maydonlarni to\'ldiring', 'error');
      return;
    }

    setLoading(true);

    try {
      const imageResults = [];
      for (const file of images) {
        const result = await uploadCarImage(file, form.brand, form.model, form.year);
        imageResults.push(result);
      }

      const allImages = [...existingImages, ...imageResults];

      const carPayload = {
        title: form.title || `${form.brand} ${form.model}`,
        brand: form.brand,
        model: form.model,
        description: form.description,
        year: Number(form.year),
        price: Number(form.price),
        mileage: form.mileage ? Number(form.mileage) : null,
        fuelType: form.fuelType,
        transmission: form.transmission,
        bodyType: form.bodyType,
        category: form.categoryId,
        images: allImages,
      };

      if (isEdit) {
        await updateCar(editId, carPayload);
        logActivity(`${form.brand} ${form.model} tahrirlandi`, 'update', { brand: form.brand, model: form.model });
        showToast('Avtomobil muvaffaqiyatli tahrirlandi!', 'success');
      } else {
        await addCar(carPayload);
        logActivity(`${form.brand} ${form.model} qo'shildi`, 'add', { brand: form.brand, model: form.model, year: form.year });
        showToast('Avtomobil muvaffaqiyatli qo\'shildi!', 'success');
        setForm(initialForm);
        setImages([]);
        setPreviews([]);
        setExistingImages([]);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <FormSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{isEdit ? 'Avtomobilni tahrirlash' : "Avtomobil qo'shish"}</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">{isEdit ? 'Avtomobil ma\'lumotlarini o\'zgartiring' : 'Yangi avtomobil ma\'lumotlarini kiriting'}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
        <Section title="Asosiy ma'lumotlar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Sarlavha" name="title" value={form.title} onChange={handleChange} placeholder="Mas: Toyota Camry 70 (Premium)" />
            <Input label="Brend" name="brand" value={form.brand} onChange={handleChange} placeholder="Mas: Toyota" required />
            <Input label="Model" name="model" value={form.model} onChange={handleChange} placeholder="Mas: Camry" required />
            <Input label="Yil" name="year" type="number" value={form.year} onChange={handleChange} required />
            <Input label="Narx (so'm)" name="price" type="number" value={form.price} onChange={handleChange} placeholder="Mas: 350000000" required />
            <Input label="Probeg (km)" name="mileage" type="number" value={form.mileage} onChange={handleChange} placeholder="Mas: 50000" />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={cn(inputClass, 'resize-none')}
              placeholder="Avtomobil haqida batafsil..."
            />
          </div>
        </Section>

        <Section title="Texnik xususiyatlar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Yoqilg'i turi" name="fuelType" value={form.fuelType} onChange={handleChange} options={formOptions.fuelTypes} required />
            <Select label="Uzatma qutisi" name="transmission" value={form.transmission} onChange={handleChange} options={formOptions.transmissions} required />
            <Select label="Kuzov turi" name="bodyType" value={form.bodyType} onChange={handleChange} options={formOptions.bodyTypes} required />
            <Select
              label="Kategoriya"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              placeholder="Kategoriya tanlang"
              required
            />
          </div>
        </Section>

        <Section title="Rasmlar (maks 5)">
          {existingImages.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Mavjud rasmlar</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200">
                    <img src={getCarImageUrl(img)} alt="" className="w-full h-20 object-cover" />
                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 p-1 bg-slate-900/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <motion.label
            whileHover={{ scale: 1.005 }}
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-900 transition-colors bg-slate-50/50"
          >
            <Upload className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-sm text-slate-500 font-medium">Rasm tanlash uchun bosing</span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5">PNG, JPG, WEBP</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          </motion.label>

          {previews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4"
            >
              {previews.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group rounded-lg overflow-hidden border border-slate-200"
                >
                  <img src={src} alt="" className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1.5 bg-slate-900/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent h-8" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Section>

        <div className="flex items-center gap-3 pb-8">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Saqlanmoqda...' : isEdit ? 'Saqlash' : "Avtomobilni qo'shish"}
          </motion.button>
          {!isEdit && (
            <motion.button
              type="button"
              onClick={() => { setForm(initialForm); setImages([]); setPreviews([]); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 border border-slate-300 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Tozalash
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <h2 className="text-sm font-semibold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
        <span className="w-0.5 h-4 bg-slate-900 rounded-full" />
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

function Input({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-slate-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options, placeholder, required }) {
  const items = Array.isArray(options) && options.length > 0 && typeof options[0] === 'object'
    ? options
    : (Array.isArray(options) ? options.map((o) => ({ value: o, label: o })) : []);

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-slate-400">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={cn(inputClass, 'appearance-none pr-8')}
        >
          <option value="">{placeholder || 'Tanlang'}</option>
          {items.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
