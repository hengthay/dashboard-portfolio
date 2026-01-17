import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import EyeToggleIcon from "../components/Helper/EyeToggleIcon";
const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

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

  console.log(formData);


  return (
    <div className="min-h-screen w-full mx-auto flex justify-center items-center">
      <div className="bg-white shadow-md shadow-cyan-200 rounded-2xl h-75 w-100 border border-gray-300 py-4 px-6 space-y-4">
        <div className="my-2 text-start flex gap-x-2">
          <CiLogin size={28} className="text-cyan-400"/>
          <h2 className="md:text-xl text-lg font-bold text-cyan-400">Login</h2>
        </div>
        <form className="space-y-2">
          <div className="w-full mt-6 relative">
            <label htmlFor="name" className={`absolute left-0 transition-all duration-200 ease-in-out cursor-text px-2 ${shouldNameLabelFloat ? '-top-3 text-xs text-cyan-600 font-medium shadow bg-white py-1 px-1 mx-2' : 'top-3.5 text-base text-gray-500'}`}>Username</label>
            <input
              type="text"
              name="name"
              id="name"
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              onChange={handleChange}
              className="bg-gray-200 py-1.5 px-2 w-full focus:outline-2 focus:outline-cyan-400 border-0 mt-2"
              placeholder="Username"
            />
            <FaRegUserCircle size={24} className={`absolute top-3.5 right-2 transition-colors ease-linear duration-300 ${shouldNameLabelFloat ? 'text-cyan-600' : 'text-gray-500'}`}/>
          </div>
          <div className="w-full mt-6 relative">
            <label htmlFor="password" className={`absolute left-0 transition-all duration-200 ease-in-out cursor-text px-2 ${shouldPasswordLabelFloat ? '-top-3 text-xs text-cyan-600 font-medium shadow bg-white py-1 px-1 mx-2' : 'top-3.5 text-base text-gray-500'}`}>Password</label>
            <input
              type={isCheckedPassword ? 'text' : 'password'}
              name="password"
              id="password"
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
            <button className="w-full bg-cyan-300 text-white py-1.5 font-semibold text-base cursor-pointer border transition-colors ease-in-out duration-300 hover:bg-transparent hover:text-black hover:border-black">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
