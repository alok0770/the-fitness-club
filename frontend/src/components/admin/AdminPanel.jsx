import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../lib/api';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => isAuthenticated());

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (!authed) {
    return <AdminLogin onLoginSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}
