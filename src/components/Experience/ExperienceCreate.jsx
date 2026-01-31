import { useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createExperience } from "../../feature/experience/experienceSlice";

const ExperienceCreate = () => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    description: "",
    start_date: "",
    end_date: "",
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

      if (!form.company || !form.position) {
        setIsError("Company and Position is required!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("company", form.company);
      formData.append("position", form.position);
      formData.append("description", form.description);
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);

      await dispatch(createExperience(formData)).unwrap();

      Swal.fire({
        title: "Created!",
        text: "Your Experience is created successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/experiences");
      }, 2000);

      // Clear form
      setForm({
        company: "",
        position: "",
        description: "",
        start_date: "",
        end_date: "",
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Experience is created failed!",
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
            Add New Experience
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new experience.
          </p>
        </div>

        <Link
          to="/experiences"
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
          <div className="md:col-span-6 col-span-12 space-y-4">
            {/* Title */}
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                placeholder="e.g. Telecom"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={form.position}
                required
                onChange={handleChange}
                placeholder="e.g. Developer"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 space-y-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea 
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your experience."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/experiences"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Experience
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  );
};

export default ExperienceCreate;
