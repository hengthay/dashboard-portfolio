import React from "react";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "../Helper/formatDate";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { removeEducationById } from "../../feature/education/educationSlice";

const EducationCard = ({ education }) => {
  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This education will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeEducationById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Education has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your education could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };
  return (
    <div
      key={education?.id}
      className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition"
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
              {education?.institution}
            </h3>

            <span className="inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
              #{education?.id}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Degree + Field */}
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-semibold">{education?.degree}</span>
              <span className="text-gray-400"> • </span>
              <span className="font-medium">{education?.field}</span>
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">Status:</span>

            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                education?.status?.toLowerCase().includes("graduat")
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {/* dot */}
              <span
                className={`w-2 h-2 rounded-full ${
                  education?.status?.toLowerCase().includes("graduat")
                    ? "bg-indigo-500"
                    : "bg-emerald-500"
                }`}
              ></span>
              {education?.status || "Unknown"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-600">Duration:</span>
            <span>
              {education?.start_date
                ? formatDate(education?.start_date)
                : "Unknown"}{" "}
              –{" "}
              {education?.end_date ? formatDate(education?.end_date) : "Present"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex md:flex-row flex-col gap-2 sm:items-end justify-end my-2">
            {/* View */}
            <Link
              to={`/educations/${education?.id}`}
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
              to={`/educations/${education?.id}/edit`}
              className={`p-2 rounded-xl bg-blue-100 text-blue-600 
                hover:bg-blue-200 hover:scale-105 shadow-sm
                transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
              title="Edit"
            >
              <CiEdit size={20} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
                `}
              >
                Edit
              </span>
            </Link>

            {/* Delete */}
            <button
              type="button"
              onClick={() => handleDelete(education?.id)}
              className={`p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 shadow-sm transition-all duration-200 cursor-pointer flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
              title="Delete"
            >
              <MdDelete size={20} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-14 opacity-100"}
                `}
              >
                Remove
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
