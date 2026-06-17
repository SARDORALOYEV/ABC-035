import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Shield, Calendar, Save, Loader2, LogOut, Camera,
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import Toast from '../../components/admin/Toast';

export default function AdminProfile() {
  const { admin, profile, logout, updateProfile } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    bio: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !admin) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result;
      setForm((prev) => ({ ...prev, avatar_url: dataUrl }));
      try {
        await updateProfile({ avatar_url: dataUrl });
        setToast({ message: 'Rasm yangilandi', type: 'success' });
      } catch {
        setToast({ message: 'Rasm saqlanmadi', type: 'error' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        full_name: form.full_name,
        phone: form.phone,
        bio: form.bio,
      });
      setToast({ message: 'Profil yangilandi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const joinedDate = admin?.created_at
    ? new Date(admin.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
    : '--';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Profil</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Shaxsiy ma'lumotlaringiz</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto overflow-hidden border-2 border-slate-200">
                {form.avatar_url ? (
                  <img src={form.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white text-2xl font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || admin?.email?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors shadow-md">
                <Camera className="w-4 h-4 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </label>
            </div>

            <h2 className="text-base font-semibold text-slate-900 mt-4">
              {profile?.full_name || 'Admin'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">{admin?.email}</p>

            <div className="mt-5 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-medium capitalize">{profile?.role || 'admin'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">Qo'shilgan: {joinedDate}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Chiqish
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-slate-900 rounded-full" />
              Shaxsiy ma'lumotlar
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    To'liq ism
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Ism Familiya"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+998 90 000 00 00"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={admin?.email || ''}
                  disabled
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
                />
                <p className="text-[10px] text-slate-400 mt-1">Emailni o'zgartirib bo'lmaydi</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="O'zingiz haqingizda qisqacha..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
              <motion.button
                onClick={handleSave}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" />
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </motion.button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-slate-900 rounded-full" />
              Xavfsizlik
            </h3>

            <div className="space-y-3">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/auth/me', {
                      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
                    });
                    const data = await res.json();
                    if (data.data?.email) {
                      setToast({ message: `Parolni tiklash uchun admin bilan bog'laning: ${data.data.email}`, type: 'success' });
                    }
                  } catch {
                    setToast({ message: 'Xatolik yuz berdi', type: 'error' });
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">Parolni o'zgartirish</p>
                  <p className="text-xs text-slate-500 mt-0.5">Email orqali parolni tiklash</p>
                </div>
                <Shield className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
