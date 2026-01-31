import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createEducation } from "../../feature/education/educationSlice";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Swal from "sweetalert2";

const EducationCreate = () => {
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    field: "",
    status: "",
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

      if (!form.institution || !form.degree) {
        setIsError("Institution and Degree are required!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("institution", form.institution);
      formData.append("degree", form.degree);
      formData.append("field", form.field);
      formData.append("status", form.status);
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);

      await dispatch(createEducation(formData)).unwrap();

      Swal.fire({
        title: "Created!",
        text: "Your Education is created successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/educations");
      }, 2000);

      // Clear form
      setForm({
        institution: "",
        degree: "",
        field: "",
        status: "",
        start_date: "",
        end_date: "",
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Education is created failed!",
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
            Add New Education
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new education.
          </p>
        </div>

        <Link
          to="/educations"
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
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                required
                placeholder="e.g. Harvard University"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Degree Type <span className="text-red-500">*</span>
              </label>
              <select 
                name="degree"
                value={form.degree}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="">Select degree</option>
                <option value="Associate">Associate</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <input
                type="text"
                name="field"
                value={form.field}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 space-y-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status" 
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
               >
                <option value="" defaultChecked>Choose a Status Type</option>
                <option value="Studying">Studying</option>
                <option value="Graduated">Graduated</option>
              </select>
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
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/educations"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Education
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  );
};

export default EducationCreate;
