import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProtectedRoute = () => {
  const user = useSelector((state) => state.auth.adminInfo);

  // Only for debugging purposes; remove in production
  if (user) {
    console.log(user.role);
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/adminLogin" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;

