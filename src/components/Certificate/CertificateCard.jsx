import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { removeCertificateById } from "../../feature/certificate/certificateSlice";
import { useDispatch } from "react-redux";

const CertificateCard = ({ certificate }) => {
  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This certificate will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeCertificateById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Certificate has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your certificate could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Image */}
        <div className="w-full sm:w-44 sm:h-32 h-44 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
          {
            certificate?.image ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${certificate?.image}`}
                alt={certificate?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 rounded-2xl">
                <span className="text-sm font-medium">No image available</span>
              </div>
            )
          }
          
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
              {certificate?.title}
            </h3>

            <span className="inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
              #{certificate?.id ?? "--"}
            </span>
          </div>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
            <p className="truncate">
              <span className="text-gray-400">Issuer:</span>{" "}
              <span className="font-medium text-gray-700">
                {certificate?.issuer ?? '--'}
              </span>
            </p>

            <p className="truncate">
              <span className="text-gray-400">Issued:</span>{" "}
              <span className="font-medium text-gray-700">
                {certificate?.issue_date ?? '--'}
              </span>
            </p>
          </div>

          {/* Small footer */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-400">
              Updated: {certificate?.updated_at?.slice(0, 10)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:items-end">
          {/* View */}
          <Link
            to={`/certificates/${certificate?.id}`}
            className={`p-2 rounded-xl bg-amber-100 text-amber-600 
              hover:bg-amber-200 hover:scale-105 shadow-sm
              transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="View"
          >
            <GrView size={20} />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all max-sm:text-sm duration-300 ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
              `}
            >
              View
            </span>
          </Link>

          {/* Edit */}
          <Link
            to={`/certificates/${certificate?.id}/edit`}
            className={`p-2 rounded-xl bg-blue-100 text-blue-600 
              hover:bg-blue-200 hover:scale-105 shadow-sm
              transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="Edit"
          >
            <CiEdit size={20} />
            <span
              className={`
                whitespace-nowrap
                overflow-hidden
                transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
              `}
            >
              Edit
            </span>
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleDelete(certificate?.id)}
            className={`p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 shadow-sm transition-all duration-200 cursor-pointer flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="Delete"
          >
            <MdDelete size={20} />
            <span
              className={`
                whitespace-nowrap
                overflow-hidden
                transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-14 opacity-100"}
              `}
            >
              Remove
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
