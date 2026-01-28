import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProject } from '../../feature/project/projectSlice';
import Swal from 'sweetalert2';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

const ProjectCreate = () => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image_url: null,
    demo_url: "",
    github_url: "",
    technologies: [],
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [techInput, setTechInput] = useState("");
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_url") {
      const file = files?.[0];
      setForm((prev) => ({ ...prev, image_url: file || null }));
      if (file) setPreview(URL.createObjectURL(file));
      return;
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  // Add technologies
  const addTech = () => {
    // Clear space
    const t = techInput.trim();
    // If technologies empty
    if (!t) return;
    // If form of technologies include t return, mean cannot input duplicate data.
    if (form.technologies.includes(t)) return;
    // Set technologies to form with previous data.
    setForm((prev) => ({ ...prev, technologies: [...prev.technologies, t] }));
    setTechInput("");
  };
  // Remove technologies
  const removeTech= (t) => {
    // Set technologies and filtered out
    setForm((prev) => ({ ...prev, technologies: prev.technologies.filter((x) => x !== t) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.title || !form.technologies) {
        setIsError("Title and Technologies is required!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image_url", form.image_url); 
      formData.append("demo_url", form.demo_url);
      formData.append("github_url", form.github_url);

      // tags loop through tag and append to formdata
      form.technologies.forEach((t, i) => {
        formData.append(`technologies[${i}]`, t);
      });

      await dispatch(createProject(formData)).unwrap();

      Swal.fire({
        title: "Created!",
        text: "Your Project is created successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/projects");
      }, 2000);

      // Clear form
      setForm({
        title: "",
        description: "",
        category: "",
        image_url: null,
        demo_url: "",
        github_url: "",
        technologies: [],
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Project is created failed!",
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl text-gray-900">
            Add New Blog
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new blog.
          </p>
        </div>

        <Link
          to="/projects"
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
        <div className="grid grid-cols-12 max-sm:w-70 items-center justify-center gap-6 mx-auto">
          <div className="md:col-span-8 col-span-12 flex flex-col item-start justify-start space-y-4">
            {/* Title */}
            <div className="space-y-1 flex flex-col">
              <label id="title" className="text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Online Shop"
                className="w-full max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {/* Demo URL */}
            <div className="space-y-1 flex flex-col">
              <label id="demo_url" className="text-sm font-medium text-gray-700">
                Demo URL
              </label>
              <input
                type="text"
                id="demo_url"
                name="demo_url"
                value={form.demo_url}
                onChange={handleChange}
                placeholder="e.g. https://hengthay.github.io/redux-todo-app-and-react/"
                className="w-full max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {/* Github URL */}
            <div className="space-y-1 flex flex-col">
              <label id="demo_url" className="text-sm font-medium text-gray-700">
                Github URL
              </label>
              <input
                type="text"
                id="github_url"
                name="github_url"
                value={form.github_url}
                onChange={handleChange}
                placeholder="e.g. https://hengthay.github.io/redux-todo-app-and-react/"
                className="w-full max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {/* Category */}
            <div className="space-y-1 flex flex-col">
              <label
                id="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select 
                name="category" 
                id="category" 
                value={form.category}
                onChange={handleChange}
                className="w-full max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200">
                <option value="" selected>Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 flex flex-col">
              <label id="description" className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea 
                name="description" 
                id="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project..."
                className="w-full max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>
            
          </div>

          {/* Image upload */}
          <div className="space-y-2 md:col-span-4 col-span-12 flex flex-col">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Achievement Icon / Image
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
                    id="image_url"
                    name="image_url"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </p>
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Technologies</label>

              <div className="flex md:flex-row flex-col gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Type technologies and press Enter"
                  className="flex-1 max-sm:w-70 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-4 py-2 max-sm:w-70 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
              {/* Display tags */}
              <div className="flex flex-wrap gap-2">
                {form.technologies.map((tech, idx) => (
                  <span
                    key={`${tech}-${idx}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-700 px-3 py-1 rounded-full border border-cyan-500/20"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
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
            to="/projects"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer text-nowrap"
          >
            <FiSave />
            Save Project
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  )
}

export default ProjectCreate