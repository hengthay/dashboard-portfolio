import React, { useState } from 'react'
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProfile } from '../../feature/profile/profileSlice';
import Swal from 'sweetalert2';

const ProfileCreate = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    introduce: "",
    bio: "",
    hobbies: [],
    avatar_url: null,
    resume_url: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hobbieInput, setHobbieInput] = useState("");
  const [preview, setPreview] = useState("");
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If files represent
    if (files) {
      const file = files[0] || null;

      if (name === "resume_url" && file) {
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
          alert("Only PDF or Word documents are allowed!");
          return;
        }
      }

      setForm((prev) => ({
        ...prev,
        [name]: file  
      }))

      if (name === "avatar_url" && file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    // Text input
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  // Add hoobie
  const addHobbie = () => {
    // Clear space
    const t = hobbieInput.trim();
    // If hobbie empty
    if (!t) return;
    // If form of hobbies include t return, mean cannot input duplicate data.
    if (form.hobbies.includes(t)) return;
    // Set hobbies to form with previous data.
    setForm((prev) => ({ ...prev, hobbies: [...prev.hobbies, t] }));
    setHobbieInput("");
  };
  // Remove technologies
  const removeHobbie = (t) => {
    // Set hobbies and filtered out
    setForm((prev) => ({ ...prev, hobbies: prev.hobbies.filter((x) => x !== t) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.name) {
        setIsError("Name is required!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("introduce", form.introduce);
      formData.append("bio", form.bio);
      // Append only it present
      if (form.avatar_url) formData.append("avatar_url", form.avatar_url);
      if (form.resume_url) formData.append("resume_url", form.resume_url);

      // hobbies loop through hobbie and append to formdata
      form.hobbies.forEach((t) => {
        formData.append(`hobbies[]`, t);
      });

      await dispatch(createProfile(formData)).unwrap();

      Swal.fire({
        title: "Created!",
        text: "Your Profile is created successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/profiles");
      }, 2000);

      // Clear form
      setForm({
        name: "",
        email: "",
        introduce: "",
        bio: "",
        hobbies: [],
        avatar_url: null,
        resume_url: null,
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Profile is created failed!",
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
            Add New Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new profile.
          </p>
        </div>

        <Link
          to="/profiles"
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
        <div className="grid grid-cols-12 w-full max-sm:w-70 justify-center gap-6 mx-auto">
          <div className="md:col-span-8 col-span-12 space-y-4">
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
                placeholder="e.g. John Doe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input 
                type="text"
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. johndoe@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Resume URL
              </label>
              <input 
                type="file"
                name='resume_url'
                accept='.pdf,.doc,.docx'
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Introduce
              </label>
              <textarea
                name="introduce"
                value={form.introduce}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. Describe here..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. Describe here..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
          {/* Image upload */}
          <div className="space-y-2 md:col-span-4 col-span-12 flex flex-col">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Profile Icon / Image
            </p>

            <div className="flex flex-col items-start gap-6">
              {/* Preview */}
              <div className="w-full max-sm:w-70 h-70 border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="space-y-2 flex flex-col">
                    <span className="sm:text-sm text-xs text-gray-400 text-center px-2">
                      No image selected
                    </span>
                    <span className="sm:text-sm text-xs text-gray-400 text-center px-2">
                      Accept type: JPG, PNG, JPEG, SVG
                    </span>
                    <span className="sm:text-sm text-xs text-gray-400 text-center px-2">
                      File Size should be less than 2 MB.
                    </span>
                  </div>
                )}
              </div>

              {/* Upload */}
              <p className="flex justify-end items-end w-full max-sm:w-70">
                <label
                  id="image_url"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  <FiUpload />
                  Upload image
                  <input
                    type="file"
                    id="avatar_url"
                    name="avatar_url"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </p>
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Hobbies</label>

              <div className="flex md:flex-row flex-col gap-2">
                <input
                  type="text"
                  value={hobbieInput}
                  onChange={(e) => setHobbieInput(e.target.value)}
                  placeholder="Type hobbies and press Enter"
                  className="flex-1 max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHobbie();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addHobbie}
                  className="px-4 py-2 max-sm:w-70 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
              {/* Display hobbies */}
              <div className="flex flex-wrap gap-2">
                {form.hobbies.map((hobbie, idx) => (
                  <span
                    key={`${hobbie}-${idx}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-700 px-3 py-1 rounded-full border border-cyan-500/20"
                  >
                    {hobbie}
                    <button
                      type="button"
                      onClick={() => removeHobbie(hobbie)}
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
         </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/profiles"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Profile
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  )
}

export default ProfileCreate