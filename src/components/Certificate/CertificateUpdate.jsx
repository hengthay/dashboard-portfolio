import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchCertificateDetail, selectCertificateDetail, updateCertificate } from "../../feature/certificate/certificateSlice";

const CertificateUpdate = () => {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    image: null,
    issue_date: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const certificate = useSelector(selectCertificateDetail);
  const [isError, setIsError] = useState("");
  const [preview, setPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Select file
    if (name === "image") {
      const file = files?.[0];
      setForm((prev) => ({ ...prev, image: file || null }));
      if (file) setPreview(URL.createObjectURL(file));
      return;
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fetch certificate with id
  useEffect(() => {
    if (id) dispatch(fetchCertificateDetail(id));
  }, [id, dispatch]);

  // When redux is ready
  useEffect(() => {
    if(!certificate) return;

    setForm({
      title: certificate?.title || "",
      issuer: certificate?.issuer || "",
      issue_date: certificate?.issue_date || "",
      image: certificate?.image || null
    });

    setCurrentImage(certificate?.image || null);
    setPreview(null);
  }, [certificate]);
  console.log(certificate)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!form.title) {
        setIsError("Title is require!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("issuer", form.issuer);
      formData.append("issue_date", form.issue_date);
      
      if(form.image) {
        formData.append("image", form.image); 
      }

      await dispatch(updateCertificate({id, formData})).unwrap();

      Swal.fire({
        title: "Updated!",
        text: "Your Certificate is updated successfully!",
        icon: "success",
        timer: 1500,
      });
      const timeOut = setTimeout(() => {
        navigate("/certificates");
      }, 2000);

      // Clear form
      setForm({
        title: "",
        issuer: "",
        issue_date: "",
        published: 0,
        image: null,
      });

      return () => clearTimeout(timeOut);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Your Certificate is updated failed!",
        icon: "error",
        timer: 1500,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedImage = preview || (currentImage
      ? `${import.meta.env.VITE_BASE_URL}/storage/${currentImage}`
      : null);
  return (
    <div className="w-full md:p-8 p-2 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl text-gray-900">
            Update Certificate
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form to update a new certificate.
          </p>
        </div>

        <Link
          to="/certificates"
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
                Certificate Title
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

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Issuer
              </label>
              <input
                type="text"
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="e.g. Codecademy"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                name="issue_date"
                value={form.issue_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
          <div className="md:col-span-4 col-span-12">
            {/* Image upload */}
            <div className="space-y-2 flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700">
                Certificate Icon / Image
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
                      name="image"
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
            to="/certificates"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            <FiSave />
            Save Certificate
          </button>
        </div>
        {isError && <p className="text-base text-red-500">{isError}</p>}
      </form>
    </div>
  );
};

export default CertificateUpdate;
