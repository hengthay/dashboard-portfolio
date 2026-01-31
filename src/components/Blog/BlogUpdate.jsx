import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchBlogDetail,
  selectBlogDetail,
  updateBlog,
} from "../../feature/blog/blogSlice";
const BlogUpdate = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    slug: "",
    cover_image: null,
    published: 0,
    tags: [],
    join_date: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector(selectBlogDetail);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_image") {
      const file = files?.[0];
      setForm((prev) => ({ ...prev, cover_image: file || null }));
      if (file) setPreview(URL.createObjectURL(file));
      return;
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    const t = tagInput.trim();

    if (!t) return;

    if (form.tags.includes(t)) return;

    setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    setTagInput("");
  };

  const removeTag = (t) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }));
  };

  // Fetch individual Achievements
  useEffect(() => {
    try {
      if (id) dispatch(fetchBlogDetail(id));
    } catch (error) {
      console.log("failed to fetch detail of blog - ", error);
    }
  }, [id, dispatch]);

  // When redux is ready
  useEffect(() => {
    try {
      if (!blog) return;

      setForm({
        title: blog.title || "",
        content: blog.content || "",
        slug: blog.slug || "",
        cover_image: null,
        published: blog.published || 0,
        tags: blog.tags || [],
        join_date: blog.join_date || "",
      });

      setCurrentImage(blog.cover_image || "");
      setPreview(null);
    } catch (error) {
      console.log(error);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.title || !form.slug || form.tags.length === 0 ) {
        setIsError("Title, Slug and Tags are require!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("slug", form.slug);
      formData.append("published", form.published ? "1" : "0"); // 1 or 0
      formData.append("join_date", form.join_date);

      if (form.cover_image) {
        formData.append("cover_image", form.cover_image);
      }

      // tags loop through tag and append to formdata
      form.tags.forEach((t) => {
        formData.append(`tags[]`, t);
      });

      await dispatch(updateBlog({ id, formData })).unwrap();

      Swal.fire({
        title: "Updated!",
        text: "Your Blog is updated successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/blogs");
      }, 2000);

      // Clear form
      setForm({
        title: "",
        content: "",
        slug: "",
        published: 0,
        tags: [],
        join_date: "",
        cover_image: null,
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Blog is updated failed!",
        icon: "error",
        timer: 1500,
      });
      console.log("failed - ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const displayedImage =
    preview ||
    (currentImage
      ? `${import.meta.env.VITE_BASE_URL}/storage/${currentImage}`
      : null);

  return (
    <div className="w-full p-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl text-gray-900">
            Update Blog
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to create a new blog.
          </p>
        </div>

        <Link
          to="/blogs"
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
            <div className="space-y-1">
              <label id="title" className="text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Winner"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label id="slug" className="text-sm font-medium text-gray-700">
                Slug Title
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                placeholder="e.g php-learner"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label
                id="published"
                className="text-sm font-medium text-gray-700"
              >
                Published
              </label>
              <input
                type="text"
                id="published"
                name="published"
                value={form.published}
                onChange={handleChange}
                placeholder="e.g. 0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {/* Description */}
            <div className="space-y-1">
              <label id="content" className="text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={form.content}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your blogs..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tags</label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Type tag and press Enter"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
              {/* Display tags */}
              <div className="flex flex-wrap gap-2">
                {form.tags.map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-700 px-3 py-1 rounded-full border border-cyan-500/20"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image upload */}
          <div className="space-y-2 md:col-span-4 col-span-12">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Blog Icon / Image
            </p>

            <div className="flex flex-col items-start gap-6">
              {/* Preview */}
              <div className="w-full h-70 border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
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
                <label
                  id="cover_image"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  <FiUpload />
                  Upload image
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </p>
            </div>
            <div className="space-y-1">
              <label
                id="join_date"
                className="text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <input
                type="date"
                id="join_date"
                name="join_date"
                value={form.join_date}
                onChange={handleChange}
                placeholder="e.g. 0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/blogs"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Blog
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  );
};

export default BlogUpdate;
