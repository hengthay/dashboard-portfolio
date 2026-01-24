import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiSave, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchDetailAchievement,
  selectAchievementDetail,
  selectAchievementStatusDetail,
  updateAchievement,
} from "../../feature/achievement/achievementSlice";
import Swal from "sweetalert2";

const AchievementUpdate = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon_url: null,
  });

  const { id } = useParams();
  // console.log('Achievement ID: ', id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const achievement = useSelector(selectAchievementDetail);
  const achivementStatusDetail = useSelector(selectAchievementStatusDetail);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_url") {
      const file = files?.[0] || null;
      setForm((prev) => ({ ...prev, icon_url: file }));

      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch individual Achievements
  useEffect(() => {
    if (id) dispatch(fetchDetailAchievement(id));
  }, [id, dispatch]);

  // When redux is ready
  useEffect(() => {
    try {
      if (!achievement) return;

      setForm({
        title: achievement.title || "",
        description: achievement.description || "",
        icon_url: null,
      });

      setCurrentImage(achievement.icon_url || "");
      setPreview(null);
    } catch (error) {
      console.log(error);
    }
  }, [achievement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.title || !form.description) {
        setIsError("Title and description are required");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("icon_url", form.icon_url);

      await dispatch(updateAchievement({ id, formData })).unwrap();

      Swal.fire({
        title: "Updated",
        text: "Your Achievement is updated successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/achievements");
      }, 2000);

      // Clear form
      setForm({ title: "", description: "", icon_url: "" });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Achievement is updated failed!",
        icon: "error",
        timer: 1500,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedImage =
    preview ||
    (currentImage
      ? `${import.meta.env.VITE_BASE_URL}/storage/${currentImage}`
      : null);

  console.log(form);
  return (
    <div className="w-full p-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl text-gray-900">
            Update Achievement
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to update new achievement.
          </p>
        </div>

        <Link
          to="/achievements"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-12 w-full max-sm:w-70 items-center justify-center gap-6 mx-auto">
          <div className="md:col-span-8 col-span-12 space-y-4">
            {/* Title */}
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Achievement Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Hackathon Winner"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Describe your achievement..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
          <div className="md:col-span-4 col-span-12">
            {/* Image upload */}
            <div className="space-y-2 flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">
                Achievement Icon / Image
              </label>

              <div className="flex flex-col items-center gap-6">
                {/* Preview */}
                <div className="w-full h-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
                  {displayedImage ? (
                    <img
                      src={displayedImage}
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
                <p className="flex justify-end items-end w-full">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition">
                    <FiUpload />
                    Upload image
                    <input
                      type="file"
                      name="icon_url"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </p>
              </div>
            </div>
          </div>

          
        </div>
        {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/achievements"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
            >
              <FiSave />
              Save Achievement
            </button>
          </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  );
};

export default AchievementUpdate;
