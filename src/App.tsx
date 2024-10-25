import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return currentUser?.role === 'admin' ? (
    <AdminDashboard />
  ) : (
    <UserDashboard />
  );
};

export default App;