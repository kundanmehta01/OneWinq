import { useEffect, useState } from 'react';
import { authService } from '../services/authService.js';
import { AuthContext } from './AuthContext.jsx';
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  const saveSession = (data) => { const tokens = data?.tokens || data; if (tokens?.accessToken) localStorage.setItem('onewinq_access_token', tokens.accessToken); if (tokens?.refreshToken) localStorage.setItem('onewinq_refresh_token', tokens.refreshToken); setUser(data?.user || null); };
  const logout = async () => { const token = localStorage.getItem('onewinq_refresh_token'); try { if (token) await authService.logout(token); } catch { /* clear locally */ } localStorage.removeItem('onewinq_access_token'); localStorage.removeItem('onewinq_refresh_token'); setUser(null); };
  useEffect(() => { const restore = async () => { if (!localStorage.getItem('onewinq_access_token')) return setLoading(false); try { const result = await authService.getMe(); setUser(result.data.user); } catch { await logout(); } setLoading(false); }; restore(); }, []);
  return <AuthContext.Provider value={{ user, loading, setUser, saveSession, logout }}>{children}</AuthContext.Provider>;
}
