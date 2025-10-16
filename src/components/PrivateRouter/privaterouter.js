// PrivateRouters.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../../helpers/Cookie/Cookie';

export const PrivateRouters = () => {
  const token = getCookie('token');
  if (!token) return <Navigate to="/home" replace />;
  return <Outlet />;
};
