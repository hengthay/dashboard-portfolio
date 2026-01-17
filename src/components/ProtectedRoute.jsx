import React, { useEffect, useState } from 'react'
import { API_BASE_URL, axiosInstance } from './APIConfig';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`${API_BASE_URL}/check-auth`, {
      withCredentials: true
    })
    .then(() => setIsAuthenticated(true))
    .catch(() => setIsAuthenticated(false))
  }, []);

  if(isAuthenticated === null) return <div>Under Authentication...</div>

  return isAuthenticated ? <Outlet /> : navigate('/login');
}

export default ProtectedRoute