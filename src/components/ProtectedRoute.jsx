import React, { useEffect, useState } from 'react'
import { API_BASE_URL, axiosInstance } from './APIConfig';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/authSlice';

const ProtectedRoute = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      setIsAuthenticated(false);
      return;
    }

    axiosInstance.get(`${API_BASE_URL}/check-auth`, {
      withCredentials: true
    })
    .then(() => setIsAuthenticated(true))
    .catch(() => setIsAuthenticated(false))

  }, [user]);

  if(isAuthenticated === null) return <div>Under Authentication...</div>

  return isAuthenticated ? <Outlet /> : navigate('/login');
}

export default ProtectedRoute