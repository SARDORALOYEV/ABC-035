import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  ListOrdered,
  Users,
  Settings,
  LogOut,
  Gauge,
  X,
  Tag,
  Building2,
  Grid3X3,
  BarChart3,
  TrendingUp,
  FileText,
  MessageSquare,
  Shield,
  UserCog,
  Palette,
  Search,
  Globe,
  HardDrive,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const sections = [
  {
    label: 'Asosiy',
    items: [
      { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    ],
  },
  {
    label: 'Avtomobillar',
    items: [
      { to: '/admin/add-car', icon: PlusCircle, label: 'Avtomobil qo\'shish' },
      { to: '/admin/cars', icon: Car, label: 'Barcha avtomobillar' },
      { to: '/admin/brands', icon: Building2, label: 'Brendlar' },
      { to: '/admin/models', icon: Tag, label: 'Modellar' },
      { to: '/admin/categories', icon: Grid3X3, label: 'Kategoriyalar' },
    ],
  },
  {
    label: 'Buyurtmalar',
    items: [
      { to: '/admin/orders', icon: ListOrdered, label: 'Buyurtmalar' },
      { to: '/admin/orders/history', icon: FileText, label: 'Tarix' },
    ],
  },
  {
    label: 'Foydalanuvchilar',
    items: [
      { to: '/admin/users', icon: Users, label: 'Foydalanuvchilar' },
      { to: '/admin/users/roles', icon: UserCog, label: 'Rollar' },
      { to: '/admin/messages', icon: MessageSquare, label: 'Xabarlar' },
    ],
  },
  {
    label: 'Tahlillar',
    items: [
      { to: '/admin/analytics', icon: BarChart3, label: 'Analitika' },
      { to: '/admin/reports', icon: TrendingUp, label: 'Hisobotlar' },
    ],
  },
  {
    label: 'Sozlamalar',
    items: [
      { to: '/admin/settings', icon: Settings, label: 'Umumiy', end: true },
      { to: '/admin/settings/seo', icon: Globe, label: 'SEO' },
      { to: '/admin/settings/storage', icon: HardDrive, label: 'Storage' },
      { to: '/admin/settings/security', icon: Shield, label: 'Xavfsizlik' },
      { to: '/admin/settings/notifications', icon: Bell, label: 'Bildirishnomalar' },
      { to: '/admin/settings/appearance', icon: Palette, label: 'Tashqi ko\'rinish' },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isDesktop || open ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white lg:static lg:z-auto lg:h-screen flex flex-col flex-shrink-0"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <Gauge className="w-4 h-4 text-slate-900" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-slate-100">
              ABC-ADMIN
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-4 min-h-0 scrollbar-custom">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        )
                      }
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800 flex-shrink-0">
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Saytga qaytish
          </a>
        </div>
      </motion.aside>
    </>
  );
}
