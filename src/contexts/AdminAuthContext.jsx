import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginAdmin,
  logoutAdmin,
  getAdminSession,
  updateAdminProfile,
} from '../api/adminAuth';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const session = await getAdminSession();
        if (session) {
          setAdmin(session.user);
          setProfile(session.profile);
        }
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await loginAdmin(email, password);
    setAdmin(result.user);
    setProfile(result.profile);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setAdmin(null);
    setProfile(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const updated = await updateAdminProfile(updates);
    setProfile(prev => ({ ...prev, ...updated }));
    return updated;
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, profile, loading, login, logout, updateProfile }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
