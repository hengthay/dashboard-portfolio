import { CiEdit } from 'react-icons/ci'
import { GrView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { Link, useOutletContext } from 'react-router-dom'
import { formatDate } from '../Helper/formatDate'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { removeSkillById } from '../../feature/skill/skillSlice'

const SkillCard = ({ skill }) => {
  
  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This skill will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeSkillById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Skill has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your skill could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-100 space-y-4" key={skill.id}>
      <div className="flex md:flex-row flex-col justify-between sm:items-center items-start mb-4 space-y-2">
        <h3 className="text-xl font-bold">{skill.name}</h3>
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
          {skill.category ?? "--"}
        </span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-semibold inline-block text-blue-600">
            Proficiency
          </span>
          <span className="text-sm font-semibold inline-block text-blue-600">
            {skill.level ?? "--"}%
          </span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div style={{ width: `${skill.level}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-4">
        Last updated: {skill.updated_at ? formatDate(skill.updated_at) : '--'}
      </p>
      <div className="w-full flex md:flex-row flex-col gap-2 mt-2">
        {/* View */}
        <Link
          to={`/skills/${skill.id}`}
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
          to={`/skills/${skill.id}/edit`}
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
          onClick={() => handleDelete(skill.id)}
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
  )
}

export default SkillCard