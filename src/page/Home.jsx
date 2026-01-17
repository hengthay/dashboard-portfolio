import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectUser } from '../feature/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());  

      alert("Logged out successfully");

      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Logout Failed');
    }
  }

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleLogout} className='bg-cyan-400 min-w-30 px-2 py-2 rounded-md text-white cursor-pointer'>
        Logout
      </button>
    </div>
  )
}

export default Home