import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import EyeToggleIcon from "../components/Helper/EyeToggleIcon";
import { useDispatch } from "react-redux";
import { loginUser } from "../feature/auth/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(null);

  const [isCheckedPassword, setIsCheckedPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const togglePasswordVisibility = () => setIsCheckedPassword((prev) => !prev);
  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const shouldNameLabelFloat = focusedField === "name" || formData.name.length > 0;
  const shouldPasswordLabelFloat = focusedField === "password" || formData.password.length > 0;

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  // console.log(formData);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if(!formData.name || !formData.password) {
        setIsError("Please fill out the box!");
        setIsLoading(false);
        return;
      }

      const payload = {...formData};

      await dispatch(loginUser({ payload })).unwrap();

      Swal.fire({
        title: "Successfully",
        text: "Your login is successfully!",
        icon: 'success',
        timer: 2000,
      })
      const timeOut = setTimeout(() => {
        navigate('/');
      }, 2000);

      // Clear form
      setFormData({name: "", password: ""})

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: "Your login is not success!",
        icon: 'error',
        timer: 2000,
      })
      console.log('Error to make login - ',error.message);
    } finally {
      setIsLoading(false);
      setFormData({name: "", password: ""})
    }
  }

  return (
    <div className="min-h-screen w-full mx-auto flex justify-center items-center">
      <div className="bg-white shadow-md shadow-cyan-200 rounded-2xl h-75 w-100 border border-gray-300 py-4 px-6 space-y-4">
        <div className="my-2 text-start flex gap-x-2">
          <CiLogin size={28} className="text-cyan-400"/>
          <h2 className="md:text-xl text-lg font-bold text-cyan-400">Login</h2>
        </div>
        <form className="space-y-2" onSubmit={handleSumbit}>
          <div className="w-full mt-6 relative">
            <label htmlFor="name" className={`absolute left-0 transition-all duration-200 ease-in-out cursor-text px-2 ${shouldNameLabelFloat ? '-top-3 text-xs text-cyan-600 font-medium shadow bg-white py-1 px-1 mx-2' : 'top-3.5 text-base text-gray-500'}`}>Username</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              onChange={handleChange}
              className="bg-gray-200 py-1.5 px-2 w-full focus:outline-2 focus:outline-cyan-400 border-0 mt-2"
              placeholder="Username"
            />
            <FaRegUser size={20} className={`absolute top-4 right-2 transition-colors ease-linear duration-300 ${shouldNameLabelFloat ? 'text-cyan-600' : 'text-gray-500'}`}/>
          </div>
          <div className="w-full mt-6 relative">
            <label htmlFor="password" className={`absolute left-0 transition-all duration-200 ease-in-out cursor-text px-2 ${shouldPasswordLabelFloat ? '-top-3 text-xs text-cyan-600 font-medium shadow bg-white py-1 px-1 mx-2' : 'top-3.5 text-base text-gray-500'}`}>Password</label>
            <input
              type={isCheckedPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              onChange={handleChange}
              className="bg-gray-200 py-1.5 px-2 w-full focus:outline-2 focus:outline-cyan-400 border-0 mt-2"
              placeholder="Password"
            />
            <EyeToggleIcon
              isChecked={isCheckedPassword}
              onClick={togglePasswordVisibility}
              shouldPasswordLabelFloat={shouldPasswordLabelFloat}
            />
          </div>
          <div className="w-full mt-6">
            <button 
            type="submit"
            className="w-full bg-cyan-300 text-white py-1.5 font-semibold text-base cursor-pointer border transition-colors ease-in-out duration-300 hover:bg-transparent hover:text-black hover:border-black">
              {isLoading ? <p>Loading {" "}<span className="animate-pulse duration-300">...</span></p> : 'Login'}
            </button>
          </div>
        </form>
        {
          isError && (
            <p className="text-base text-red-500">{isError}</p>
          )
        }
      </div>
    </div>
  );
};

export default Login;
