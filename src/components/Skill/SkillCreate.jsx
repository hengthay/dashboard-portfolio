import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createSkill } from '../../feature/skill/skillSlice';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';

const SkillCreate = () => {

  const [form, setForm] = useState({
    name: "",
    category: "",
    level: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.name || !form.category | !form.level) {
        setIsError("All field are required!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("level", Number(form.level));

      await dispatch(createSkill(formData)).unwrap();

      Swal.fire({
        title: "Created!",
        text: "Your Skill is created successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/skills");
      }, 2000);

      // Clear form
      setForm({
        name: "",
        category: "",
        level: 0,
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Skill is created failed!",
        icon: "error",
        timer: 1500,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:p-8 p-2 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl text-gray-900">
            Add New Skill
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new skill.
          </p>
        </div>

        <Link
          to="/skills"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm"
        encType="multipart/form-data"
      >
        <div className="flex flex-col w-full max-sm:w-70 justify-center gap-6 mx-auto">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Javascript"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Level Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="level"
                min={0}
                max={100}
                value={form.level}
                onChange={handleChange}
                placeholder="e.g. 1%"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select 
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="">Select Category</option>
                <option value="Frotend Development">Frotend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Databse Management">Database Management</option>
                <option value="DevOps & Tools">DevOps & Tools</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/skills"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Skill
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  )
}

export default SkillCreate