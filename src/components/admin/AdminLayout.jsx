import { useState, useRef, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, Bell, Search, LogOut, User, ChevronDown, Clock, Car, ShoppingCart, Users, X } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { getRecentActivity, subscribeToRealtimeActivity } from '../../api/adminService';
import Sidebar from './Sidebar';

const notificationIcons = {
  add: Car,
  order: ShoppingCart,
  user: Users,
  update: Car,
  delete: Car,
  info: Bell,
};

const notificationColors = {
  add: 'bg-emerald-500',
  order: 'bg-blue-500',
  user: 'bg-violet-500',
  update: 'bg-amber-500',
  delete: 'bg-red-500',
  info: 'bg-slate-500',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Hozir';
  if (mins < 60) return `${mins} daqiqa oldin`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  return `${days} kun oldin`;
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { admin, profile, logout, loading } = useAdminAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!loading && !admin) {
      navigate('/admin/login', { replace: true });
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getRecentActivity(10);
      setNotifications(data || []);
    })();

    const unsub = subscribeToRealtimeActivity((entry) => {
      setNotifications((prev) => [entry, ...prev].slice(0, 20));
    });
    return () => unsub();
  }, []);

  if (loading) return null;
  if (!admin) return null;

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/admin/login');
  };

  const unreadCount = notifications.filter((n) => {
    const diff = n.created_at ? Date.now() - new Date(n.created_at).getTime() : 0;
    return diff < 3600000;
  }).length;

  return (
    <div className="h-screen overflow-hidden flex bg-slate-50 font-sans antialiased">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs ml-4">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              className="bg-transparent text-sm outline-none w-full text-slate-500 placeholder:text-slate-400 font-medium"
            />
            <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium">⌘K</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-4.5 h-4.5 text-slate-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-slate-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900">Bildirishnomalar</h3>
                    <button onClick={() => setNotifOpen(false)} className="p-0.5 hover:bg-slate-100 rounded">
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <Bell className="w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-xs text-slate-500 font-medium">Bildirishnomalar yo'q</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Yangi harakatlar haqida xabar olasiz</p>
                      </div>
                    ) : (
                      notifications.map((n, i) => {
                        const Icon = notificationIcons[n.type] || Bell;
                        const color = notificationColors[n.type] || 'bg-slate-500';
                        return (
                          <div key={n.id || i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                            <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-slate-700 leading-snug">{n.action}</p>
                              <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {timeAgo(n.created_at)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <Link
                      to="/admin/analytics"
                      onClick={() => setNotifOpen(false)}
                      className="text-[11px] text-slate-500 font-medium hover:text-slate-800 transition-colors"
                    >
                      Barcha bildirishnomalar
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-semibold tracking-tight overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0)?.toUpperCase() || admin?.email?.charAt(0)?.toUpperCase() || 'A'
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-800 leading-none">
                    {profile?.full_name || 'Admin'}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate max-w-[120px]">
                    {admin?.email || ''}
                  </p>
                </div>
                <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">{profile?.full_name || 'Admin'}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{admin?.email}</p>
                  </div>
                  <Link
                    to="/admin/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profil
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Sozlamalar
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
