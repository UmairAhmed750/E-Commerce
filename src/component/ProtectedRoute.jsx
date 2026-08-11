import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const context = useContext(ShopContext) || {};
  const {
    user = null,
    isAdminLoggedIn = false,
    authLoading = false,
    role = 'guest'
  } = context;

  const activeEmail = (user?.email || '').toLowerCase();
  const isAuthenticated = !!(user || localStorage.getItem('user'));
  const isUserAdmin =
    isAdminLoggedIn ||
    role === 'admin' ||
    activeEmail === 'admin@gmail.com' ||
    localStorage.getItem('isAdminLoggedIn') === 'true';

  // Allow rendering even while authentication is loading
  if (authLoading) {
    return children;
  }

  // 1. If unauthenticated visitor tries to access protected page
  if (!isAuthenticated && !isUserAdmin) {
    toast.error('Please log in to access this page.');
    return <Navigate to="/login" replace />;
  }

  // 2. If non-admin customer tries to access admin route
  if (adminOnly && !isUserAdmin) {
    toast.error('Access denied. Admin authorization required.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
