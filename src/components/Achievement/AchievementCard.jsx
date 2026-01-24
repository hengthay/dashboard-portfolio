import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  fetchAchievement,
  removeAchievementById,
} from "../../feature/achievement/achievementSlice";
import Swal from "sweetalert2";

const AchievementCard = ({ achievement }) => {
  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This achievement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeAchievementById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Achievement has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your achievement could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };
  
  return (
    <div
      className="w-full flex justify-between group items-center bg-white border border-gray-300 min-h-20 rounded-2xl p-4 gap-x-6 hover:shadow-sm"
      key={achievement.id}
    >
      <div className="w-full flex flex-col sm:flex-row items-center gap-4">
        <p className="inline-flex items-center text-sm font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">#{achievement.id}</p>
        <div className="w-full sm:w-40 sm:h-30 h-35">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/storage/${achievement.icon_url}`}
            alt={achievement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-xl"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="md:text-xl sm:text-lg text-base font-semibold text-gray-900 line-clamp-1">
            {achievement.title}
          </h3>

          <p className="font-normal text-sm text-gray-500 line-clamp-3 text-wrap">
            {achievement.description}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 sm:items-end">
          {/* View */}
          <Link
            to={`/achievements/${achievement.id}`}
            className={`p-2 rounded-xl bg-amber-100 text-amber-600 
                hover:bg-amber-200 hover:scale-105 shadow-sm
                transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="View"
          >
            <GrView size={20} />
            <span
              className={`
                whitespace-nowrap
                overflow-hidden
                transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
              `}
            >
              View
            </span>
          </Link>

          {/* Edit */}
          <Link
            to={`/achievements/${achievement.id}/edit`}
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
            onClick={() => handleDelete(achievement.id)}
            className={`p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition-all duration-200 shadow-sm cursor-pointer flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
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

export default AchievementCard;

