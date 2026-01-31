import { CiEdit } from 'react-icons/ci'
import { GrView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useOutletContext } from 'react-router-dom'
import { removeProfileById } from '../../feature/profile/profileSlice'
import Swal from 'sweetalert2'

const ProfileCard = ({ profile }) => {

  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This profile will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeProfileById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Profile has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your profile could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };
  return (
    <div
      key={profile.id}
      className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition"
      >
      <div className="w-full sm:h-60 h-44 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
        {
          profile?.avatar_url ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/storage/${profile.avatar_url}`}
              alt={profile.name}
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
      <div className="flex flex-col sm:flex-row sm:items-center mt-3">
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 tracking-wider leading-relaxed">
              {profile.name ?? "--"}
            </h3>

            <span className="inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
              #{profile.id ?? "--"}
            </span>
          </div>
          <div className="mt-2 space-y-2">
            <p className="text-gray-500 leading-relaxed tracking-wider">{profile.introduce ?? "No Introduce"}</p>
            <p className="text-gray-500 leading-relaxed tracking-wider">{profile.bio ?? "No Bio"}</p>
          </div>
                        
          {/* Actions */}
          <div className="flex md:flex-row flex-col gap-2 sm:items-end justify-end my-2">
            {/* View */}
            <Link
              to={`/profiles/${profile.id}`}
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
              to={`/profiles/${profile.id}/edit`}
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
              onClick={() => handleDelete(profile.id)}
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
  )
}

export default ProfileCard