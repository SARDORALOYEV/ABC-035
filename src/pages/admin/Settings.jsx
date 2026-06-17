import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  Globe,
  HardDrive,
  Shield,
  Bell,
  Palette,
  Save,
  Loader2,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import Toast from '../../components/admin/Toast';
import { getAllSettings, saveSettings } from '../../api/crudService';

const tabs = [
  { path: '/admin/settings', id: 'general', label: 'Umumiy', icon: SettingsIcon },
  { path: '/admin/settings/seo', id: 'seo', label: 'SEO', icon: Globe },
  { path: '/admin/settings/storage', id: 'storage', label: 'Storage', icon: HardDrive },
  { path: '/admin/settings/security', id: 'security', label: 'Xavfsizlik', icon: Shield },
  { path: '/admin/settings/notifications', id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
  { path: '/admin/settings/appearance', id: 'appearance', label: 'Tashqi ko\'rinish', icon: Palette },
];

export default function Settings() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, '');
  const currentTab = path === '/admin/settings' ? 'general' : path.split('/').pop();
  const [settings, setSettings] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSettings();
        setSettings(data);
      } catch (err) {
        setToast({ message: err.message, type: 'error' });
      }
      setLoaded(true);
    })();
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (keys) => {
    if (!keys) {
      setToast({ message: 'Hech narsa saqlanmadi', type: 'error' });
      return;
    }
    try {
      for (const key of keys) {
        if (settings[key] !== undefined) {
          await saveSettings(key, settings[key]);
        }
      }
      setToast({ message: 'Sozlamalar saqlandi', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sozlamalar</h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">Tizim sozlamalarini boshqaring</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 p-2 space-y-0.5 sticky top-20">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  currentTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {currentTab === 'general' && (
              <GeneralSettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
            {currentTab === 'seo' && (
              <SeoSettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
            {currentTab === 'storage' && (
              <StorageSettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
            {currentTab === 'security' && (
              <SecuritySettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
            {currentTab === 'notifications' && (
              <NotificationSettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
            {currentTab === 'appearance' && (
              <AppearanceSettings settings={settings} updateSetting={updateSetting} onSave={handleSave} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingField({ label, description, children }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex-1 mr-4">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function SaveBar({ onSave, saving }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-slate-200">
      <motion.button
        onClick={onSave}
        disabled={saving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        <Save className="w-4 h-4" />
        {saving ? 'Saqlanmoqda...' : 'Saqlash'}
      </motion.button>
    </div>
  );
}

function GeneralSettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['site_name', 'site_language', 'currency', 'items_per_page']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">Umumiy sozlamalar</h2>
      <p className="text-xs text-slate-500 mb-6">Asosiy tizim sozlamalari</p>
      <SettingField label="Sayt nomi" description="Brauzer tabida ko'rinadi">
        <input type="text" value={settings.site_name || 'ABC Auto'} onChange={(e) => updateSetting('site_name', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SettingField label="Sayt tili" description="Standart til">
        <select value={settings.site_language || 'uz'} onChange={(e) => updateSetting('site_language', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="uz">O'zbekcha</option><option value="ru">Русский</option><option value="en">English</option>
        </select>
      </SettingField>
      <SettingField label="Valyuta" description="Narxlar uchun standart valyuta">
        <select value={settings.currency || 'UZS'} onChange={(e) => updateSetting('currency', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="UZS">UZS (so'm)</option><option value="USD">USD ($)</option>
        </select>
      </SettingField>
      <SettingField label="Elementlar soni" description="Sahifadagi elementlar limiti">
        <input type="number" value={settings.items_per_page || 20} onChange={(e) => updateSetting('items_per_page', e.target.value)} className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

function SeoSettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['meta_title', 'meta_description', 'canonical_url']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">SEO sozlamalari</h2>
      <p className="text-xs text-slate-500 mb-6">Qidiruv tizimi optimallashtirish</p>
      <SettingField label="Meta title" description="Bosh sahifa sarlavhasi">
        <input type="text" value={settings.meta_title || 'ABC Auto - Avtomobillar'} onChange={(e) => updateSetting('meta_title', e.target.value)} className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SettingField label="Meta description" description="Qidiruv natijalarida ko'rinadi">
        <input type="text" value={settings.meta_description || "O'zbekistondagi eng yirik avtomobil platformasi"} onChange={(e) => updateSetting('meta_description', e.target.value)} className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SettingField label="Canonical URL" description="Asosiy sayt manzili">
        <input type="text" value={settings.canonical_url || 'https://abc-auto.uz'} onChange={(e) => updateSetting('canonical_url', e.target.value)} className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

function StorageSettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['storage_provider', 'image_quality', 'max_file_size']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">Storage sozlamalari</h2>
      <p className="text-xs text-slate-500 mb-6">Fayl va rasm saqlash sozlamalari</p>
      <SettingField label="Storage provayder" description="Fayl saqlash xizmati">
        <select value={settings.storage_provider || 'supabase'} onChange={(e) => updateSetting('storage_provider', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="supabase">Supabase Storage</option>
        </select>
      </SettingField>
      <SettingField label="Rasm sifati" description="Yuklangan rasmlar sifati (%)">
        <input type="number" value={settings.image_quality || 80} onChange={(e) => updateSetting('image_quality', e.target.value)} className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10" />
      </SettingField>
      <SettingField label="Maksimal fayl" description="Yuklash mumkin bo'lgan maksimal fayl hajmi">
        <select value={settings.max_file_size || '5'} onChange={(e) => updateSetting('max_file_size', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="5">5 MB</option><option value="10">10 MB</option><option value="20">20 MB</option>
        </select>
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

function SecuritySettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['two_factor_auth', 'session_timeout', 'ip_blocking']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">Xavfsizlik sozlamalari</h2>
      <p className="text-xs text-slate-500 mb-6">Tizim xavfsizligi va kirish sozlamalari</p>
      <SettingField label="Ikki faktorli autentifikatsiya" description="2FA yoqish">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.two_factor_auth === 'true'} onChange={(e) => updateSetting('two_factor_auth', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SettingField label="Session muddati" description="Avtomatik chiqish vaqti">
        <select value={settings.session_timeout || '4'} onChange={(e) => updateSetting('session_timeout', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="1">1 soat</option><option value="4">4 soat</option><option value="8">8 soat</option><option value="24">24 soat</option>
        </select>
      </SettingField>
      <SettingField label="IP bloklash" description="Shubhali IP manzillarni bloklash">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.ip_blocking === 'true'} onChange={(e) => updateSetting('ip_blocking', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

function NotificationSettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['notify_new_order', 'notify_new_user', 'email_reports']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">Bildirishnoma sozlamalari</h2>
      <p className="text-xs text-slate-500 mb-6">Push va email bildirishnomalar</p>
      <SettingField label="Yangi buyurtma" description="Yangi buyurtma kelganda bildirish">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.notify_new_order !== 'false'} onChange={(e) => updateSetting('notify_new_order', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SettingField label="Yangi foydalanuvchi" description="Ro'yxatdan o'tish haqida xabar">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.notify_new_user !== 'false'} onChange={(e) => updateSetting('notify_new_user', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SettingField label="Email hisobotlar" description="Kunlik email hisobotlari">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.email_reports === 'true'} onChange={(e) => updateSetting('email_reports', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

function AppearanceSettings({ settings, updateSetting, onSave }) {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await onSave(['color_scheme', 'font_size', 'sidebar_collapsed']);
    setSaving(false);
  };
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900 mb-1">Tashqi ko'rinish</h2>
      <p className="text-xs text-slate-500 mb-6">Admin panel dizayn sozlamalari</p>
      <SettingField label="Rang sxemasi" description="Admin panel rangi">
        <select value={settings.color_scheme || 'platinum'} onChange={(e) => updateSetting('color_scheme', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="platinum">Platinum (qora-kulrang)</option><option value="light">Oq (Light mode)</option><option value="dark">Qora (Dark mode)</option>
        </select>
      </SettingField>
      <SettingField label="Shrift o'lchami" description="Matn o'lchami">
        <select value={settings.font_size || 'medium'} onChange={(e) => updateSetting('font_size', e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 bg-white">
          <option value="small">Kichik</option><option value="medium">O'rtacha</option><option value="large">Katta</option>
        </select>
      </SettingField>
      <SettingField label="Sidebar yig'ilgan" description="Sidebar default holati">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={settings.sidebar_collapsed === 'true'} onChange={(e) => updateSetting('sidebar_collapsed', e.target.checked ? 'true' : 'false')} className="sr-only peer" />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-slate-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
        </label>
      </SettingField>
      <SaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}
